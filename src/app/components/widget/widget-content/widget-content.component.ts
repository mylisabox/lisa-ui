import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {Device} from "../../../models/device.type";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-widget-content',
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss']
})
export class WidgetContentComponent implements OnInit, OnChanges {
  private _device: Device;
  @ViewChild('target', {read: ViewContainerRef}) target;
  private _isInitialized: boolean;
  @Output() onChange: EventEmitter<WidgetEvent> = new EventEmitter();
  @Output() onSizeChange: EventEmitter<number[]> = new EventEmitter();

  get device(): Device {
    return this._device;
  }

  @Input() set device(device: Device) {
    this._device = device;
    this._buildContent();
  }

  constructor(private _componentFactory: ComponentFactoryResolver,
              private _ngEl: ElementRef,
              private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'vbox');
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._buildContent();
  }

  private _buildContent() {
    this.target.clear();
    this.disableEvent();
    this.onSizeChange.next([this.device.template.widgetWidth || 1, this.device.template.widgetHeight || 1])
    WidgetHelpers.addComponents(this, this.target, this._componentFactory, this.device.template, this.device);
    this.enableEvent();
  }

  onValueChange(info: WidgetEvent) {
    if (this._isInitialized) {
      this.onChange.emit(info);
    }
  }

  enableEvent() {
    setTimeout(_ => this._isInitialized = true, 100); //FIXME ugly ! try to find a way to get end on sub children update/initialisation
  }

  disableEvent() {
    this._isInitialized = false;
  }

  getWidgetSize() {
    return [this.device.template.widgetWidth || 1, this.device.template.widgetHeight || 1]
  }
}
