import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {Device} from "../../../models/device.type";
import {BaseElement} from "../../../interfaces/base-element";
import {ComponentHelpers} from "../../../shared/component-helpers";

@Component({
  selector: 'lisa-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements BaseElement, OnInit {
  @Input() flex: number = 1;
  @Input() name: string;
  @Input() path: string;
  device: Device;
  infos: any;

  @ViewChild('input') input: ElementRef;
  value: boolean = false;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onToggle(value: boolean): void {
    this.value = !value;
    this._renderer.setAttribute(this.input.nativeElement, 'checked', this.value ? 'checked' : null);
    this.onChange.next({
      device: this.device,
      key: this.name,
      value: this.value
    })
  }

  populateComponent() {
    this.value = ComponentHelpers.get(this.device.data, this.infos.value);
  }
}
