import {Component, OnInit, Renderer2, ElementRef} from "@angular/core";
import {AccordionConfig} from "ngx-bootstrap";

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), {closeOthers: true});
}

@Component({
  selector: 'lisa-add-device-modal',
  templateUrl: './add-device-modal.component.html',
  styleUrls: ['./add-device-modal.component.scss'],
  providers: [{provide: AccordionConfig, useFactory: getAccordionConfig}]
})
export class AddDeviceModalComponent implements OnInit {

  constructor(private _ngEl: ElementRef,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    this._renderer.addClass(this._ngEl.nativeElement, 'hidden');
  }

  hide() {
    this._renderer.addClass(this._ngEl.nativeElement, 'hidden');
  }

  show() {
    this._renderer.removeClass(this._ngEl.nativeElement, 'hidden');
  }
}
