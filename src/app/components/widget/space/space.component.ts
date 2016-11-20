import {Component, OnInit, Input, Renderer, ElementRef} from "@angular/core";

@Component({
  selector: 'lisa-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  @Input() flex: number = 1;

  constructor(private _ngEl: ElementRef, private _renderer: Renderer) {
  }

  ngOnInit() {
    this._renderer.setElementStyle(this._ngEl.nativeElement, 'flex', this.flex + '');
  }

}
