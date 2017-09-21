import {Component, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {ComponentHelpers} from "../../../shared/component-helpers";

@Component({
  selector: 'lisa-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements BaseElement, OnInit {
  device: Device;
  @Input() value: string;
  @Input() values: Array<String> | Object = null;
  @Input() name: string;
  infos: any;
  @Input() flex: number = 1;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {
    this.value = ComponentHelpers.get(this.device.data, this.infos.value, this.infos.value);
    this.values = ComponentHelpers.get(this.device.data, this.infos.values, this.infos.values);
  }
}
