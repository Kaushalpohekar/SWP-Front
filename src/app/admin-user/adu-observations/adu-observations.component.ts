import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_data from 'highcharts/modules/data';
import HC_drilldown from 'highcharts/modules/drilldown';

HC_exporting(Highcharts);
HC_data(Highcharts);
HC_drilldown(Highcharts);

@Component({
  selector: 'app-adu-observations',
  templateUrl: './adu-observations.component.html',
  styleUrls: ['./adu-observations.component.css']
})
export class AduObservationsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
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
      categories: ['HWP', 'CWP', 'CSEP', 'QWP', 'AWP', 'AAP'],
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
    },
    plotOptions: {
      column: { // Changing 'bar' to 'column'
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'total',
        type: 'column',
        data: [10, 20, 34 , 23, 17, 11],
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, '#7cb5ec'],
            [1, '#434348']
          ]
        }
      }
    ]
  };

  chartOptions2: Highcharts.Options = {
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
      enabled: false
    },
    xAxis: {
      categories: ['HWP', 'CWP', 'CSEP', 'QWP', 'AWP', 'AAP'],
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
      enabled: false // Hiding the legend
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'total',
        type: 'column',
        data: [
          { y: 45, color: '#8fa9b5' }, // lightest shade
          { y: 20, color: '#909596' },
          { y: 34, color: '#293840' },
          { y: 23, color: '#1a5069' },
          { y: 17, color: '#2d6bcf' },
          { y: 11, color: '#82acbf' } // darkest shade
        ]
      }
    ]
  };

  chartOptionsDonut: Highcharts.Options = {
    chart: {
      type: 'pie',
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
    plotOptions: {
      pie: {
        innerSize: '60%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          distance: -50
        },
        colors: ['#e6f2f5', '#b3d1e1', '#80afee', '#4d8dec', '#1a6ddd', '#004ccf']
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
    series: [
      {
        name: 'total',
        type: 'pie',
        data: [
          { name: 'HWP', y: 45 },
          { name: 'CWP', y: 20 },
          { name: 'CSEP', y: 34 },
          { name: 'QWP', y: 23 },
          { name: 'AWP', y: 17 },
          { name: 'AAP', y: 11 }
        ]
      }
    ]
  };
}