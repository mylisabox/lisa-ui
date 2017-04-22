import {Component, OnInit, Input, Renderer2, ElementRef} from "@angular/core";
import {BaseElement} from "../../../interfaces/base-element";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements BaseElement, OnInit {
  @Input() flex: number = 1;
  device: Device;
  path: string;
  name: string;
  infos: any;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer2) {

  }

  ngOnInit() {
    this._renderer.setStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

  populateComponent() {

  }
}
