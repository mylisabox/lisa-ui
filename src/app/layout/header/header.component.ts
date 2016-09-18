import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'lisa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public isNotificationCollapsed: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  logout() {
    this.authService.logout();
  }

}
