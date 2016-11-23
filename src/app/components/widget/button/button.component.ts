import {Component, OnInit, Renderer, ElementRef, Input} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements BaseElement, OnInit {
  device: Device;
  path: string;
  name: string;
  infos: any;
  @Input() flex: number = 1;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'main-center', true);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'cross-center', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {

  }
}
