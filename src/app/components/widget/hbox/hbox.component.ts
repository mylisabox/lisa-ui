import {Component, OnInit, ElementRef, Renderer} from "@angular/core";

@Component({
  selector: 'lisa-hbox',
  templateUrl: './hbox.component.html',
  styleUrls: ['./hbox.component.scss']
})
export class HboxComponent implements OnInit {

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'hbox', true);
  }

  ngOnInit() {
  }

}
