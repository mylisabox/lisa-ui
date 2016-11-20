import {Component, OnInit, Input, Renderer, ElementRef, EventEmitter, Output} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";

@Component({
  selector: 'lisa-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent implements OnInit {
  @Input() flex: number = 1;
  @Input() values: any;
  @Input() value: any;
  @Input() name: string;
  @Input() path: string;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'main-center', true);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'cross-center', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onClick() {
    if (Array.isArray(this.values)) {
      if (this.value + 1 >= this.values.length) {
        this.value = 0;
      }
      else {
        this.value++;
      }
    }
    else {
      const keys = Object.keys(this.values);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key == this.value) {
          this.value = keys[i + 1] || keys[0];
          break;
        }
      }
    }

    this.onChange.emit({
      path: this.path,
      key: this.name,
      value: this.value
    });
  }

}
