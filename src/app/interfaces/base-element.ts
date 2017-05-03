import {Device} from "../models/device.type";
import {ViewContainerRef} from "@angular/core";
import {WidgetEvent} from "./widget-event.type";
import {Subject} from "rxjs";
export interface BaseElement {
  device: Device;
  isViewGroup?: boolean;
  infos?: any;
  viewCtnRef?: ViewContainerRef;
  name: string;
  flex: number;
  onChange?: Subject<WidgetEvent>;

  populateComponent();
}
