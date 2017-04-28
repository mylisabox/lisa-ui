import {ComponentFactoryResolver, ViewContainerRef} from "@angular/core";
import {SpaceComponent} from "../components/widget/space/space.component";
import {SliderComponent} from "../components/widget/slider/slider.component";
import {ToggleButtonComponent} from "../components/widget/toggle-button/toggle-button.component";
import {ImageButtonComponent} from "../components/widget/image-button/image-button.component";
import {ImageComponent} from "../components/widget/image/image.component";
import {ColorPickerComponent} from "../components/widget/color-picker/color-picker.component";
import {CardComponent} from "../components/widget/card/card.component";
import {HboxComponent} from "../components/widget/hbox/hbox.component";
import {VboxComponent} from "../components/widget/vbox/vbox.component";
import {CameraComponent} from "../components/widget/camera/camera.component";
import {Device} from "../models/device.type";
import {BaseElement} from "../interfaces/base-element";
import {ButtonComponent} from "../components/widget/button/button.component";
import {WidgetContentComponent} from "../components/widget/widget-content/widget-content.component";

export class WidgetHelpers {

  static get(obj: any, path: string, defaultValue: any = undefined) {
    if (!path) path = "";
    let parts = path.split(".");
    while (parts.length > 1) {
      obj = obj[parts.shift()] || [];
    }
    return obj[parts.shift()] || defaultValue;
  }

  static getComponentType(component): any {
    switch (component.type) {
      case 'vbox':
        return VboxComponent;
      case 'hbox':
        return HboxComponent;
      case 'card':
        return CardComponent;
      case 'color-picker':
        return ColorPickerComponent;
      case 'camera':
        return CameraComponent;
      case 'button':
        return ButtonComponent;
      case 'image':
        return ImageComponent;
      case 'image-button':
        return ImageButtonComponent;
      case 'toggle-button':
        return ToggleButtonComponent;
      case 'slider':
        return SliderComponent;
      default:
        return SpaceComponent;
    }
  }

  static addComponents(parent: WidgetContentComponent, viewCntRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver,
                       component: any, device: Device): any {
    if (!component || !device) return;

    let factory = componentFactoryResolver.resolveComponentFactory(WidgetHelpers.getComponentType(component));
    const ref = viewCntRef.createComponent(factory);
    const ngComponent: BaseElement = ref.instance as BaseElement;
    ngComponent.name = component.name;
    ngComponent.flex = component.flex || 1;
    ngComponent.device = device;
    if (!ngComponent.isViewGroup) {
      ngComponent.infos = component;
      ngComponent.populateComponent();
      if (ngComponent.onChange) {
        ngComponent.onChange.subscribe(parent.onValueChange.bind(parent));
      }
    }
    if (component.children) {
      component.children.forEach(child => {
        WidgetHelpers.addComponents(parent, ngComponent.viewCtnRef, componentFactoryResolver, child, device);
      });
    }
    return ref.instance;
  }
}
