import {Component, OnInit, Input, ElementRef, Renderer, ViewChild, EventEmitter, Output} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";

@Component({
  selector: 'lisa-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
  @Input() flex: number = 1;
  @Input() name: string;
  @Input() path: string;
  @ViewChild('input') input: ElementRef;
  value: boolean = false;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'main-center', true);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'cross-center', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onToggle(value: boolean): void {
    this.value = !value;
    this._renderer.setElementAttribute(this.input.nativeElement, 'checked', this.value ? 'checked' : null);
    this.onChange.emit({
      path: this.path,
      key: this.name,
      value: this.value
    })
  }

}
