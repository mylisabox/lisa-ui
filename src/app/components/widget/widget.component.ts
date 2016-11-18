import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Renderer,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import {Device} from "../../models/device.type";
import {WidgetComponent} from "ng2-dashboard";
import {WidgetHandleDirective} from "ng2-dashboard/directives/widget-handle.directive";

@Component({
  selector: 'lisa-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  providers: [{provide: WidgetComponent, useExisting: forwardRef(() => WidgetLISAComponent)}]
})
export class WidgetLISAComponent extends WidgetComponent implements OnInit {
  @Input() device: Device;
  @Input() public widgetId: string;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;
  @Output() onRemove: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onRename: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onFavorite: EventEmitter<Device> = new EventEmitter<Device>();

  constructor(protected _ngEl: ElementRef,
              protected _renderer: Renderer) {
    super(_ngEl, _renderer);
    this._renderer.setElementClass(this._ngEl.nativeElement, 'shadow-box', true);
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
