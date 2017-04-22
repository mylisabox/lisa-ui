import {Component, OnInit, Renderer2, ElementRef, Input} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements BaseElement, OnInit {
  device: Device;
  path: string;
  infos: any;
  img: string;
  video: string;
  @Input() name: string;
  @Input() src: string;
  @Input() flex: number = 1;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {
    this.img = WidgetHelpers.get(this.device, this.infos.image);
    this.video = WidgetHelpers.get(this.device, this.infos.video);
    this.src = this.img;
  }

  onClick() {
    if (this.src == this.img) {
      this.src = this.video;
    }
    else {
      this.src = this.img;
    }
  }
}
