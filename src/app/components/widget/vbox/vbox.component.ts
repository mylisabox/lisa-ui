import {Component, OnInit, ElementRef, Renderer} from "@angular/core";

@Component({
  selector: 'lisa-vbox',
  templateUrl: './vbox.component.html',
  styleUrls: ['./vbox.component.scss']
})
export class VboxComponent implements OnInit {

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'vbox', true);
  }

  ngOnInit() {
  }

}
