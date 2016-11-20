import {Component, OnInit, ElementRef, Renderer, Input} from "@angular/core";

@Component({
  selector: 'lisa-vbox',
  templateUrl: './vbox.component.html',
  styleUrls: ['./vbox.component.scss']
})
export class VboxComponent implements OnInit {
  @Input() flex: number = 1;

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'vbox', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

}
