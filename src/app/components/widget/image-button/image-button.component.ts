import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from "@angular/core";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";
import {ComponentHelpers} from "../../../shared/component-helpers";

@Component({
  selector: 'lisa-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent implements BaseElement, OnInit {
  device: Device;
  infos: any;
  @Input() flex: number = 1;
  @Input() values: Array<String> | Object = null;
  @Input() value: any;
  @Input() name: string;
  @Input() path: string;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  onImageLoaded(event) {
    console.log(event.target.width + ' ' + event.target.height + ', ' + this._ngEl.nativeElement.clientWidth + ' ' + this._ngEl.nativeElement.clientHeight)

    if (event.target.width > this._ngEl.nativeElement.clientWidth) {
      this._renderer.addClass(this._ngEl.nativeElement, 'stretchX')
    }
    else if (event.target.height > this._ngEl.nativeElement.clientHeight) {
      this._renderer.addClass(this._ngEl.nativeElement, 'stretchY')
    }

    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + ' 1 0');
  }

  onClick() {
    if (this.values) {
      if (Array.isArray(this.values)) {
        if (this.value + 1 >= (this.values as Array<String>).length) {
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
    }
    this.onChange.next({
      device: this.device,
      key: this.name,
      value: this.value
    });
  }

  populateComponent() {
    this.values = ComponentHelpers.get(this.device.data, this.infos.values, null);
    this.value = ComponentHelpers.get(this.device.data, this.infos.value, this.infos.value);
  }
}
