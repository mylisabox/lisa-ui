import {Directive, Renderer, ElementRef, AfterViewInit} from "@angular/core";

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements AfterViewInit {
  constructor(private el: ElementRef, private rd: Renderer) {

  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
