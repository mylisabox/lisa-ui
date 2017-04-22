import {Component, OnInit, Renderer2, ElementRef, Input, ViewContainerRef} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements BaseElement, OnInit {
  isViewGroup: boolean = true;
  viewCtnRef: ViewContainerRef;
  device: Device;
  path: string;
  name: string;
  @Input() flex: number = 1;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._ngEl.nativeElement, 'main-center');
    this._renderer.addClass(this._ngEl.nativeElement, 'cross-center');
  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {

  }
}
