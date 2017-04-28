import {Device} from "../models/device.type";
import {ViewContainerRef, EventEmitter} from "@angular/core";
import {WidgetEvent} from "./widget-event.type";
export interface BaseElement {
  device: Device;
  isViewGroup?: boolean;
  infos?: any;
  viewCtnRef?: ViewContainerRef;
  name: string;
  flex: number;
  onChange?: EventEmitter<WidgetEvent>;

  populateComponent();
}
