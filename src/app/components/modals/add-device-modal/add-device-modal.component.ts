import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";
import {AccordionConfig} from "ngx-bootstrap";
import {PluginService} from "../../../services/plugin.service";
import {Plugin} from "../../../models/plugin.type";
import {FieldService} from "../../../services/field-service";
import {PluginDevice} from "../../../models/plugin-device.type";
import {FormGroup} from "@angular/forms";
import {DeviceService} from "../../../services/device.service";
import {Device} from "../../../models/device.type";

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), {closeOthers: true});
}

@Component({
  selector: 'lisa-add-device-modal',
  templateUrl: './add-device-modal.component.html',
  styleUrls: ['./add-device-modal.component.scss'],
  providers: [{provide: AccordionConfig, useFactory: getAccordionConfig}, FieldService]
})
export class AddDeviceModalComponent implements OnInit {
  _plugins: Plugin[];
  form: FormGroup;
  currentPlugin: Plugin;
  currentDevice: PluginDevice;
  error: string;

  constructor(private _pluginService: PluginService,
              private _deviceService: DeviceService,
              private _fieldService: FieldService,
              private _ngEl: ElementRef,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    this._renderer.addClass(this._ngEl.nativeElement, 'hidden');
  }

  hide() {
    this.currentDevice = null;
    this._renderer.addClass(this._ngEl.nativeElement, 'hidden');
  }

  show() {
    this.search();
    this._renderer.removeClass(this._ngEl.nativeElement, 'hidden');
  }

  backToSearch() {
    this.currentDevice = null;
  }

  search() {
    this._pluginService.search('').subscribe(
      (plugins: Plugin[]) => {
        this._plugins = plugins
      },
      err => console.log(err)
    )
  }

  deviceClicked(plugin, device) {
    this.currentDevice = device;
    this.currentPlugin = plugin;
    this.form = this._fieldService.toFormGroup(this.currentDevice.settings);
    console.log(plugin, device);
  }

  saveDevice() {
    const formData = this.form.value;

    const directField = ['id', 'name', 'pluginName', 'type', 'template'];

    const device: Device = {
      id: formData.id,
      name: formData.name,
      pluginName: formData.pluginName,
      template: formData.template,
      type: formData.type,
      data: {},
      privateData: {}
    };

    for (let setting of this.currentDevice.settings) {
      if (setting.private) {
        device.privateData[setting.name] = formData[setting.name]
      }
      else if (directField.indexOf(setting.name) === -1) {
        device.data[setting.name] = formData[setting.name]
      }
    }
    this.error = null;
    this._deviceService.postItem(device).subscribe(results => {
      this.hide();
    }, error => {
      this.error = error;
    });
  }
}
