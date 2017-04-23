import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Renderer2
} from "@angular/core";
import {Device} from "../../models/device.type";
import {WidgetHandleDirective, WidgetComponent} from "ngx-dashboard";
import {WidgetContentComponent} from "./widget-content/widget-content.component";

const forwardReference = forwardRef(() => WidgetLISAComponent);

@Component({
  selector: 'lisa-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  providers: [{provide: WidgetComponent, useExisting: forwardReference}]
})
export class WidgetLISAComponent extends WidgetComponent implements OnInit {
  private _device: Device;
  @Input() public widgetId: string;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;
  @ViewChild(WidgetContentComponent) protected _content: WidgetContentComponent;
  @Output() onRemove: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onRename: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onFavorite: EventEmitter<Device> = new EventEmitter<Device>();

  get device(): Device {
    return this._device;
  }

  @Input() set device(device: Device) {
    this._device = device;
    this._content.device = device;
  }

  constructor(protected _ngEl: ElementRef,
              protected _renderer: Renderer2) {
    super(_ngEl, _renderer);
    this._renderer.addClass(this._ngEl.nativeElement, 'shadow-box');
    this._renderer.addClass(this._ngEl.nativeElement, 'vbox');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onRenameDevice(device: Device): void {
    this.onRename.emit(device);
  }

  onRemoveDevice(device: Device): void {
    this.onRemove.emit(device);
  }

  onFavoriteDevice(device: Device): void {
    this.onFavorite.emit(device);
  }

}
