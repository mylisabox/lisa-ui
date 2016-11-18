import {Component, OnInit, Input} from "@angular/core";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-widget-content',
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss']
})
export class WidgetContentComponent implements OnInit {
  @Input() device: Device

  constructor() {
  }

  ngOnInit() {
  }

}
