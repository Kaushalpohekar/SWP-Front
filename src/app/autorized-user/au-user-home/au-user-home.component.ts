import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { LoadingService } from '../../service/loading.service';
import { DataService } from '../service/data.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_data from 'highcharts/modules/data';
import HC_drilldown from 'highcharts/modules/drilldown';
import HC_pie from 'highcharts/modules/variable-pie';
import { Observable, Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize, catchError } from 'rxjs/operators';

HC_exporting(Highcharts);
HC_data(Highcharts);
HC_drilldown(Highcharts);
HC_pie(Highcharts);

@Component({
  selector: 'app-au-user-home',
  templateUrl: './au-user-home.component.html',
  styleUrls: ['./au-user-home.component.css']
})
export class AuUserHomeComponent implements OnInit, OnDestroy {
  user_id!: string;
  selectedInterval!: string;
  openedData: any = {};
  totalByStatus: any = {};
  intervalData = [
    { name: 'Hour', value: '1hour' },
    { name: 'Day', value: '1day' },
    { name: 'Week', value: '1week' },
    { name: 'Month', value: '1month' },
    { name: 'Half Year', value: '6month' },
    { name: 'Full Year', value: '12month' }
  ];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  donutOptions: Highcharts.Options = {}; // Donut chart options
  statusOptions: Highcharts.Options = {};
  lineChartOptions: Highcharts.Options = {};

  loading$: Observable<boolean>; // Observable to manage loading state
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private snackBar: MatSnackBar,
    public dataService: DataService,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    private loadingService: LoadingService // Inject LoadingService
  ) {
    this.loading$ = this.loadingService.loading$; // Assign loading$ from LoadingService
  }

  ngOnInit(): void {
    this.checkCookies();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  checkCookies(): void {
    const savedInterval = this.cookieService.get('_auth_intrvl');
    this.selectedInterval = savedInterval ? savedInterval : '1day';
  }

  fetchData(): void{
    this.user_id = this.encryptService.decryptData(this.cookieService.get('_user_id'));
    forkJoin([
      this.loadData(),
      this.loadDonutData(),
      this.loadStatusData(),
      this.loadApprovedCounts()
    ]).pipe(
      takeUntil(this.ngUnsubscribe),
      finalize(() => this.loadingService.loadingSubject.next(false)), // Stop loading indicator
      catchError(error => {
        console.error('Error fetching data:', error);
        this.snackBar.open('Failed to fetch data. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingService.loadingSubject.next(false); // Stop loading on error
        return [];
      })
    ).subscribe(([barChartData, donutChartData, loadStatusData, lineChartData]: [any, any, any, any]) => {
      // barChartData and donutChartData contain data for bar chart and donut chart respectively
      this.openedData = barChartData; // Assuming bar chart data is fetched in loadData()
      this.totalByStatus = loadStatusData;
      this.setupChart(); // Initialize bar chart
      this.setupDonutChart(donutChartData); // Initialize donut chart
      this.setupStatusChart();
      this.setupLineChart(lineChartData); 
    });
  }

  onIntervalChange(selectedInterval: any): void {
    this.selectedInterval = selectedInterval.value;
    this.cookieService.set('_auth_intrvl', this.selectedInterval, { path: '/' });
    this.fetchData();
  }

  loadData(): Observable<any> {
    this.loadingService.loadingSubject.next(true); // Start loading indicator
    return this.dataService.getFormTypeBar(this.user_id, this.selectedInterval).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(error => {
        console.error('Error fetching data:', error);
        this.snackBar.open('Failed to fetch data. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingService.loadingSubject.next(false); // Stop loading on error
        return [];
      })
    );
  }

  loadDonutData(): Observable<any> {
    this.loadingService.loadingSubject.next(true); // Start loading indicator
    return this.dataService.getFormTypePercentages(this.user_id, this.selectedInterval).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(error => {
        console.error('Error fetching data for donut chart:', error);
        this.snackBar.open('Failed to fetch data for donut chart. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingService.loadingSubject.next(false); // Stop loading on error
        return [];
      })
    );
  }

  loadStatusData(): Observable<any> {
    this.loadingService.loadingSubject.next(true); 
    return this.dataService.getStatusCounts(this.user_id, this.selectedInterval).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(error => {
        console.error('Error fetching data for donut chart:', error);
        this.snackBar.open('Failed to fetch data for Status chart. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingService.loadingSubject.next(false); // Stop loading on error
        return [];
      })
    );
  }

  loadApprovedCounts(): Observable<any> {
    this.loadingService.loadingSubject.next(true);
    return this.dataService.getApprovedCounts(this.user_id, this.selectedInterval).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(error => {
        console.error('Error fetching data for line chart:', error);
        this.snackBar.open('Failed to fetch data for line chart. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingService.loadingSubject.next(false); // Stop loading on error
        return [];
      })
    );
  }

  setupChart(): void {
    const categories = ['Observations', 'Incidents', 'Permits', 'Actions', 'Audits'];

    const seriesData = categories.map(category => {
      const value = this.openedData.hasOwnProperty(category.toLowerCase())
                    ? this.openedData[category.toLowerCase()]
                    : 0;
      return value;
    });

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false // Disabling the exporting module
      },
      xAxis: {
        categories: categories,
        title: {
          text: ''
        },
        gridLineWidth: 0,
        labels: {
          style: {
            fontSize: '10px',
            fontWeight: '550',
            color: '#333333' // Adjust x-axis font color
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        min: 0,
        gridLineWidth: 1,
        tickAmount: 5,
        labels: {
          style: {
            fontSize: '10px',
            fontWeight: '550',
            color: '#333333' // Adjust x-axis font color
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 10,
        floating: true,
        backgroundColor: '#FFFFFF',
        itemStyle: {
          fontSize: '12px',
          fontWeight: '550'
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: false
          },
          animation: {
            duration: 1000, // Set animation duration
            easing: 'easeOutBounce' // Set easing function
          }
        }
      },
      series: [
        {
          name: 'New',
          type: 'column',
          data: seriesData,
          color: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#008554'],
              [1, '#035539']
            ]
          }
        }
      ]
    };
  }

  setupDonutChart(data: any): void {
    const categories = Object.keys(data); // Extract categories from data keys

    const seriesData = categories.map((category, index) => {
      return {
        name: category,
        y: data[category].percentage,
        color: ['#008554', '#016e4f', '#025849', '#034143', '#035539'][index % 5] // Using modulo to cycle through colors
      };
    });

    this.donutOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: '' // Remove title text to ensure it doesn't display over the chart
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f}%</b>',
            distance: -50 // Adjust label distance from center to position on the pie slice
          },
          colors: ['#008554', '#016e4f', '#025849', '#034143', '#035539']
        }
      },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        floating: true,
        backgroundColor: '#FFFFFF',
        symbolRadius: 0,
        symbolHeight: 14,
        symbolWidth: 14,
        symbolPadding: 10,
        itemMarginBottom: 10,
        itemStyle: {
          fontSize: '12px',
          fontWeight: 'normal'
        },
        labelFormatter: function () {
          return '<div style="width: 100px;">' + this.name + '</div>';
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: seriesData
      }]
    };
  }

  setupStatusChart(): void {
    const categories = ['Opened', 'Approved', 'Rejected', 'Extended', 'Revoked', 'Overdue'];

    const seriesData = categories.map(category => {
        const value = this.totalByStatus.hasOwnProperty(category.toLowerCase())
                        ? this.totalByStatus[category.toLowerCase()]
                        : 0;
        return {
            name: category, // Category name
            total: value,   // Total count for the category
            color: this.getColorForCategory(category.toLowerCase()), // Custom color function based on category
            y: value        // Data value (same as 'total' here)
        };
    });

    this.statusOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false // Disabling the exporting module
        },
        xAxis: {
            categories: categories,
            title: {
                text: ''
            },
            gridLineWidth: 0,
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: '550',
                    color: '#333333' // Adjust x-axis font color
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            gridLineWidth: 1,
            tickAmount: 5,
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: '550',
                    color: '#333333' // Adjust y-axis font color
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 10,
            floating: true,
            backgroundColor: '#FFFFFF',
            itemStyle: {
                fontSize: '12px',
                fontWeight: '550'
            },
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false
                },
                animation: {
                    duration: 1000, // Set animation duration
                    easing: 'easeOutBounce' // Set easing function
                }
            }
        },
        series: [{
            name: 'Total',
            type: 'column',
            data: seriesData,
            color: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#008554'],
                    [1, '#035539']
                ]
            }
        }]
    };
  }

setupLineChart(lineChartData: any[]): void {
  // Ensure time data is sorted and parsed as needed
  lineChartData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const categories = lineChartData.map(dataPoint => {
    const originalTime = new Date(dataPoint.time);
    // Apply 330 minutes offset (5 hours and 30 minutes)
    const offsetTime = new Date(originalTime.getTime() + 330 * 60000); // 330 minutes * 60000 milliseconds
    return offsetTime;
  });

  const approvedData = lineChartData.map(dataPoint => dataPoint.approve);
  const rejectedData = lineChartData.map(dataPoint => dataPoint.rejected);

  this.lineChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      type: 'datetime', // Specify datetime for time-based x-axis
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: ''
      },
      gridLineWidth: 0,
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: '550',
          color: '#333333' // Adjust x-axis font color
        }
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      min: 0,
      gridLineWidth: 1,
      tickAmount: 5,
      labels: {
        style: {
          fontSize: '10px',
          fontWeight: '550',
          color: '#333333' // Adjust y-axis font color
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      backgroundColor: '#FFFFFF',
      itemStyle: {
        fontSize: '12px',
        fontWeight: '550'
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce'
        }
      }
    },
    series: [
      {
        name: 'Approved',
        type: 'line',
        data: approvedData.map((value, index) => [categories[index].getTime(), value]), // Use adjusted time
        color: '#008554'
      },
      {
        name: 'Rejected',
        type: 'line',
        data: rejectedData.map((value, index) => [categories[index].getTime(), value]), // Use adjusted time
        color: '#c91a29'
      }
    ]
  };
}




  getColorForCategory(category: string): string {
    switch (category) {
        case 'opened':
            return '#0c4aa8'; 
        case 'approved':
            return '#035539'; 
        case 'rejected':
            return '#c91a29'; 
        case 'extended':
            return '#b0670e'; 
        case 'revoked':
            return '#b84106'; 
        case 'overdue':
            return '#b80413'; 
        default:
            return '#757575'; 
    }
  }

}
