import { Component } from '@angular/core';

@Component({
  selector: 'lisa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date: Date = new Date();
  title = 'L.I.S.A. works!';
}
