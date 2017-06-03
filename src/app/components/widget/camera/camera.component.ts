import {Component, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {WidgetHelpers} from "../../../shared/widget-helpers";
import {Globals} from "../../../common/globals";

@Component({
  selector: 'lisa-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements BaseElement, OnInit {
  device: Device;
  path: string;
  infos: any;
  playState = 'play';
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
    this.img = WidgetHelpers.get(this.device.data, this.infos.image);
    this.video = WidgetHelpers.get(this.device.data, this.infos.video);
    if (!this.img || this.img == '') {
      this.img = Globals.getUrl('/camera/snapshot?url=' + this.video)
    }
    else {
      this.img = Globals.getUrl('/camera/snapshot?url=' + this.img)
    }
    this.video = Globals.getUrl('/camera/stream?url=' + this.video)
    this.src = this.video;
    this.togglePlay();
  }

  togglePlay() {
    if (this.src == this.video) {
      this.playState = 'play';
      this.src = this.img + '?v=' + new Date().getTime();
    }
    else {
      this.playState = 'pause';
      this.src = this.video;
    }
  }

  refreshScreenshot() {
    this.src = this.img + '?v=' + new Date().getTime();
  }

  toggleFullScreen() {
    if (this.src == this.video) {
      this.togglePlay();
    }
    //todo open/close a full screen popup with image inside
  }
}
