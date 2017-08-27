import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, Renderer2} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {Subject} from "rxjs/Subject";
import {ComponentHelpers} from "../../../shared/component-helpers";

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

  @Output() public onChange: Subject<WidgetEvent> = new Subject<WidgetEvent>();
  private isInitialized: boolean = false;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngAfterViewInit(): void {
    this.isInitialized = true;
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onColorChange(color: string) {
    this.value = color;
    if (this.isInitialized) {
      this.onChange.next({
        device: this.device,
        key: this.name,
        value: color
      });
    }
  }

  populateComponent() {
    this.value = ComponentHelpers.get(this.device.data, this.infos.value);
  }
}
