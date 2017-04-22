import {Component, OnInit, Input, ElementRef, Renderer2, ViewChild, EventEmitter, Output} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {Device} from "../../../models/device.type";
import {BaseElement} from "../../../interfaces/base-element";
import {WidgetHelpers} from "../../../shared/widget-helpers";

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
    this.onChange.emit({
      path: this.path,
      key: this.name,
      value: this.value
    })
  }

  populateComponent() {
    this.value = WidgetHelpers.get(this.device, this.infos.value);
  }
}
