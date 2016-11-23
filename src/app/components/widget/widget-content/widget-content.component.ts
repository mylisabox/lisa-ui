import {
  Component,
  OnInit,
  Input,
  Renderer,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {Device} from "../../../models/device.type";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {DeviceService} from "../../../services/device.service";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-widget-content',
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss']
})
export class WidgetContentComponent implements OnInit, OnChanges, AfterViewInit {
  private _device: Device;
  @ViewChild('target', {read: ViewContainerRef}) target;
  private _isInitialized: boolean;

  get device(): Device {
    return this._device;
  }

  @Input() set device(device: Device) {
    this._device = device;
    this._buildContent();
  }

  constructor(private _deviveApi: DeviceService,
              private _componentFactory: ComponentFactoryResolver,
              private _ngEl: ElementRef,
              private _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'vbox', true);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._buildContent();
  }

  private _buildContent() {
    this.target.clear();
    this._isInitialized = false;
    WidgetHelpers.addComponents(this, this.target, this._componentFactory, this.device.template, this.device);
    setTimeout(_=> this._isInitialized = true, 30); //FIXME try to find a way to get end on sub children initialisation
  }

  onValueChange(info: WidgetEvent) {
    if (this._isInitialized) {
      info.device = this.device;
      this._deviveApi.postDeviceValue(info).subscribe(
        data => {

        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
