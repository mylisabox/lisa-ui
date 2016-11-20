import {Component, OnInit, ElementRef, Renderer, Input} from "@angular/core";

@Component({
  selector: 'lisa-hbox',
  templateUrl: './hbox.component.html',
  styleUrls: ['./hbox.component.scss']
})
export class HboxComponent implements OnInit {
  @Input() flex: number = 1;

  constructor(protected _ngEl: ElementRef, protected _renderer: Renderer) {
    this._renderer.setElementClass(this._ngEl.nativeElement, 'hbox', true);
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

}
