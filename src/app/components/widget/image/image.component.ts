import {Component, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {ComponentHelpers} from "../../../shared/component-helpers";

@Component({
  selector: 'lisa-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements BaseElement, OnInit {
  device: Device;
  path: string;
  infos: any;
  @Input() flex: number = 1;
  @Input() img: string;
  @Input() name: string;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {
    this.img = ComponentHelpers.get(this.device.data, this.infos.value);
  }
}
