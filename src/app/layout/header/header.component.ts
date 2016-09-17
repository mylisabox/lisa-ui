import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lisa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public isNotificationCollapsed: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

}
