import { Component, OnInit} from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    constructor(
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.isPageLoading(false);
  }

}
