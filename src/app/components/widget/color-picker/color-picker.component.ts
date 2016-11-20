import {Component, OnInit, Input, Renderer, ElementRef, Output, EventEmitter} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";

@Component({
  selector: 'lisa-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() flex: number = 1;
  value: string = "#127bdc";
  @Input() path: string;
  @Input() name: string;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'main-center', true);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'cross-center', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onColorChange(color: string) {
    this.value = color;
    this.onChange.emit({
      path: this.path,
      key: this.name,
      value: color
    });
  }

}
