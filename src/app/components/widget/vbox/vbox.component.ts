import {Component, OnInit, ElementRef, Renderer, Input, ViewContainerRef, ViewChild} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-vbox',
  templateUrl: './vbox.component.html',
  styleUrls: ['./vbox.component.scss']
})
export class VboxComponent implements BaseElement, OnInit {
  isViewGroup: boolean = true;
  @ViewChild('target', {read: ViewContainerRef}) viewCtnRef;
  @Input() flex: number = 1;
  device: Device;
  path: string;
  name: string;

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'vbox', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {
  }
}
