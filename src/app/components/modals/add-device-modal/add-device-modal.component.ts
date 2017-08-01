import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from "@angular/core";
import {AccordionConfig} from "ngx-bootstrap";
import {PluginService} from "../../../services/plugin.service";
import {Plugin} from "../../../models/plugin.type";
import {FieldService} from "../../../services/field-service";
import {PluginDevice} from "../../../models/plugin-device.type";
import {FormGroup} from "@angular/forms";
import {DeviceService} from "../../../services/device.service";
import {Device} from "../../../models/device.type";
import {Field} from "../../../models/field.type";

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
  @ViewChildren("checkbox") checkboxes: QueryList<any>
  _plugins: Plugin[];
  currentPlugin: Plugin;
  currentDevice: PluginDevice;
  selectAll = false;
  currentCustomStep: any = {};
  availableDevices: Device[];
  form: FormGroup;
  currentCustomData: any = {};
  stepHistory: string[] = [];
  canContinue: boolean;
  error: string;
  roomId: string;

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

  toggleSelectAll() {
    this.selectAll = !this.selectAll;

    this.checkboxes.forEach(checkbox => {
      checkbox.nativeElement.checked = this.selectAll;
      if (this.selectAll) {
        this.canContinue = true
      }
    });
  }

  deviceChecked() {
    let selected = true;
    this.canContinue = false;
    this.checkboxes.forEach(checkbox => {
      if (checkbox.nativeElement.checked) {
        this.canContinue = true;
      }
      selected = selected && checkbox.nativeElement.checked;
    });
    this.selectAll = selected;
  }

  _resetFlow() {
    this.currentCustomStep = {}
    this.currentDevice = null;
    this.currentCustomData = {};
    this.stepHistory = [];
  }

  show(roomId: string) {
    this.roomId = roomId;
    this._resetFlow();
    this.search('');
    this._renderer.removeClass(this._ngEl.nativeElement, 'hidden');
  }

  search(query: string): void {
    this._pluginService.search(query).subscribe(
      (plugins: Plugin[]) => {
        this._plugins = plugins
      },
      err => console.log(err)
    )
  }

  private getDevicesList() {
    //TODO call getDevices from plugin driver
    this.manageListStep(null);
  }

  deviceTypeClicked(plugin, device) {
    this.currentDevice = device;
    this.currentPlugin = plugin;

    if (this.currentDevice.pairing === 'settings') {
      this.manageSettingsStep(this.currentDevice.settings);
    }
    else if (this.currentDevice.pairing === 'list') {
      this.getDevicesList();
    }
    else if (this.currentDevice.pairing === 'image') {
      this.manageImageStep('TODO');
    }
    else if (this.currentDevice.pairing === 'custom') {
      this.goToNextCustomStep();
    }
    console.log(plugin, device);
  }

  private saveDevices() {
    //TODO save devices directly on L.I.S.A. and set roomID
  }

  private saveDevice() {
    const formData = this.form.value;

    const directField = ['id', 'name', 'pluginName', 'type', 'driver', 'template'];

    const device: Device = {
      id: formData.id,
      name: formData.name,
      roomId: this.roomId,
      pluginName: this.currentDevice.pluginName,
      driver: this.currentDevice.driver || formData.driver,
      template: this.currentDevice.template || formData.template,
      type: this.currentDevice.type || formData.type,
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

  private manageSettingsStep(settings: Array<Field>) {
    this.form = this._fieldService.toFormGroup(settings);
  }

  private manageListStep(stepList: any) {
    this.selectAll = false;
    this.availableDevices = stepList.devices;
  }

  private manageImageStep(image: string) {

  }

  private goToNextCustomStep() {
    this._pluginService.pairing(this.currentDevice.pluginName, this.currentDevice.driver, this.currentCustomData)
      .subscribe((data: any) => {
        this.currentCustomStep = data
        this.manageCurrentStep();
        console.log(data)
      }, err => console.log(err))
  }

  private back() {
    this.canContinue = false;
    const previous = this.stepHistory.pop();
    if (previous) {
      delete this.currentCustomData[this.currentCustomStep.step];
      this.currentCustomStep = previous;
      this.manageCurrentStep()
    }
    else {
      this._resetFlow();
    }

  }

  private getRealId(id: string) {
    return id.replace('add_device_', '');
  }

  private next() {
    this.canContinue = false;
    this.stepHistory.push(this.currentCustomStep);
    if (this.currentCustomStep.step.indexOf('_list') !== -1) {
      const selectedDevices = [];
      const currentData = this.currentCustomStep;

      this.checkboxes.forEach(checkbox => {
        if (checkbox.nativeElement.checked) {
          const device = currentData.devices.filter(device => device.id === this.getRealId(checkbox.nativeElement.id))[0];
          if (!device.roomId) {
            device.roomId = this.roomId;
          }
          selectedDevices.push(device);
        }
      });
      this.currentCustomData[this.currentCustomStep.step] = currentData.singleChoice ? selectedDevices[0] : selectedDevices;
      this.goToNextCustomStep();
    }
    else if (this.currentCustomStep.step == 'settings') {
      this.saveDevice();
    } else if (this.currentCustomStep.step == 'list') {
      this.saveDevices();
    }
  }

  public isDeviceSelected(device: PluginDevice): boolean {
    const devices = this.currentCustomData[this.currentCustomStep.step];
    let deviceSelected = false;
    if (devices) {
      if (this.currentCustomStep.singleChoice) {
        deviceSelected = devices.id === device.id;
      }
      else {
        deviceSelected = devices.filter(d => d.id === device.id).length > 0;
      }
    }
    return deviceSelected;
  }

  private manageCurrentStep() {
    const data = this.currentCustomStep;
    if (data.step.indexOf('list') != -1) {
      this.manageListStep(data);
    }
    else if (data.step.indexOf('settings') != -1) {
      this.manageSettingsStep(data.settings);
    }
    else if (data.step.indexOf('image') != -1) {
      this.manageImageStep(data.image);
    }
    else if (data.step.indexOf('done') != -1) {
      this.hide();
    }
  }
}
