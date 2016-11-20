import {Component, OnInit, Input, Renderer, ElementRef, ViewContainerRef, ViewChild} from "@angular/core";
import {Device} from "../../../models/device.type";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'lisa-widget-content',
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss']
})
export class WidgetContentComponent implements OnInit {
  @Input() device: Device
  @ViewChild('target', {read: ViewContainerRef})
  private target: ViewContainerRef;

  constructor(private _deviveApi: DeviceService,
              private _ngEl: ElementRef,
              private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'vbox', true);
  }

  ngOnInit() {
    //device.data.template

  }

  onValueChange(info: WidgetEvent) {
    console.log(info);
    info.device = this.device;
    this._deviveApi.postDeviceValue(info).subscribe(
      data => {

      },
      err => {
        console.log(err);
      }
    )
  }
}
