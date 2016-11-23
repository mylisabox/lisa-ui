import {Component, OnInit, ElementRef, Renderer, Input, ViewContainerRef, ViewChild} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-hbox',
  templateUrl: './hbox.component.html',
  styleUrls: ['./hbox.component.scss']
})
export class HboxComponent implements BaseElement, OnInit {
  isViewGroup: boolean = true;
  @ViewChild('target', {read: ViewContainerRef}) viewCtnRef;
  device: Device;
  path: string;
  name: string;
  @Input() flex: number = 1;

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'hbox', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {

  }
}
