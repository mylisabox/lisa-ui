import {Component, OnInit, Renderer2, ElementRef, Input, Output, EventEmitter} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements BaseElement, OnInit {
  device: Device;
  path: string;
  infos: any;
  @Input() flex: number = 1;
  @Input() text: string;
  @Input() value: string;
  @Input() name: string;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onClick() {
    this.onChange.next({
      device: this.device,
      key: this.name,
      value: this.value
    });
  }

  populateComponent() {
    this.text = WidgetHelpers.get(this.device.data, this.infos.text, this.infos.text);
    this.value = WidgetHelpers.get(this.device.data, this.infos.value, 1);
  }
}
