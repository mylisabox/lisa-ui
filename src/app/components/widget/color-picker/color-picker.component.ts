import {Component, OnInit, Input, Renderer, ElementRef, Output, EventEmitter, AfterViewInit} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements BaseElement, OnInit, AfterViewInit {
  device: Device;
  infos: any;
  @Input() flex: number = 1;
  @Input() value: string = "#127bdc";
  @Input() path: string;
  @Input() name: string;

  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();
  private isInitialized: boolean = false;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'main-center', true);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'cross-center', true);
  }

  ngAfterViewInit(): void {
    this.isInitialized = true;
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onColorChange(color: string) {
    this.value = color;
    if (this.isInitialized) {
      this.onChange.emit({
        path: this.path,
        key: this.name,
        value: color
      });
    }
  }

  populateComponent() {
    this.value = WidgetHelpers.get(this.device, this.infos.value);
  }
}
