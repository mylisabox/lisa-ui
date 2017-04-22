import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  AfterViewInit
} from "@angular/core";
import {SliderHelpers} from "./slider.helpers";
import {ControlValueAccessor} from "@angular/forms";
import {WidgetEvent} from "../../../interfaces/widget-event.type";
import {Device} from "../../../models/device.type";
import {BaseElement} from "../../../interfaces/base-element";
import {WidgetHelpers} from "../../../shared/widget-helpers";

@Component({
  selector: 'lisa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements BaseElement, OnInit, AfterViewInit, ControlValueAccessor {
  @Input() flex: number = 1;
  @Input() name: string;
  @Input() path: string;
  device: Device;
  infos: any;

  populateComponent() {
    this.value = WidgetHelpers.get(this.device, this.infos.value);
  }

  @Input() public animate: boolean = true;
  @Input() public enabled: boolean = true;
  @Input() public reversed: boolean;
  @Input() public selection: string = 'before';
  @Input() public touchCapable: boolean = true;
  @Input() public handleType: string = 'round';
  @Input() public type: string = 'slider';
  @Input() public orientation: string = 'horizontal';
  @Input() public tooltipPosition: string = 'top';
  @Input() public tooltipSplit: boolean;
  @Input() public tooltipMode: string = 'hover';
  @Input() public ticks: Array<number> = [];
  @Input() public ticksPositions: Array<number> = [];
  @Input() public ticksLabels: Array<string> = [];
  @Input() public ticksSnapBounds: number = 0;
  @Output() public onChange: EventEmitter<WidgetEvent> = new EventEmitter<WidgetEvent>();
  @Output() public onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() public onDragStop: EventEmitter<any> = new EventEmitter();
  @ViewChild('sliderCtn') private sliderCtn: ElementRef;
  @ViewChild('minHandle') private minHandle: ElementRef;
  @ViewChild('maxHandle') private maxHandle: ElementRef;
  @ViewChild('trackHigh') private trackHigh: ElementRef;
  @ViewChild('trackSelection') private trackSelection: ElementRef;
  @ViewChild('trackLow') private trackLow: ElementRef;
  @ViewChild('tooltipMain') private tooltipMain: ElementRef;
  @ViewChild('tooltipMainInner') private tooltipMainInner: ElementRef;
  @ViewChild('tooltipMin') private tooltipMin: ElementRef;
  @ViewChild('tooltipMinInner') private tooltipMinInner: ElementRef;
  @ViewChild('tooltipMax') private tooltipMax: ElementRef;
  @ViewChild('tooltipMaxInner') private tooltipMaxInner: ElementRef;
  @ViewChild('sliderTicksContainer') private sliderTicksContainer: ElementRef;
  @ViewChild('sliderLabelsContainer') private sliderLabelsContainer: ElementRef;
  @ViewChildren('tickElements') private tickElements: QueryList<ElementRef>;
  @ViewChildren('labelElements') private labelElements: QueryList<ElementRef>;

  private offset: any;
  private dragged: number;
  private isInitialized: boolean;
  private percentage: Array<number> = [];
  private size: any;
  private stylePos: string;
  private mousePos: string;
  private sizePos: string;
  private inDrag: boolean;
  private over: boolean;
  private mouseUpReference: any;
  private mouseMoveReference: any;
  private eventRemoveCallback: any = {};
  private _value: Array<number> = [0, 0];
  private _max: number = 100;
  private _min: number = 0;
  private _step: number = 1;
  private propagateChange: EventEmitter<any> = new EventEmitter();

  public constructor(private _renderer: Renderer2, private _sliderElem: ElementRef) {
    this._renderer.addClass(this._sliderElem.nativeElement, 'main-center');
    this._renderer.addClass(this._sliderElem.nativeElement, 'cross-center');
  }

  registerOnTouched(fn: any): void {
  }

  public registerOnChange(fn: any): void {
    this.propagateChange.subscribe(fn);
  }

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  /**
   * Initialize basic properties based on orientation
   */
  public ngOnInit(): void {
    this._renderer.setStyle(this._sliderElem.nativeElement, 'flex', this.flex + '');

    if (this.orientation === 'vertical') {
      this.stylePos = 'top';
      this.mousePos = 'pageY';
      this.sizePos = 'offsetHeight';
      if (this.tooltipPosition === 'top' || this.tooltipPosition === 'bottom') {
        this.tooltipPosition = 'right';
      }
    } else {
      this.stylePos = 'left';
      this.mousePos = 'pageX';
      this.sizePos = 'offsetWidth';
      if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
        this.tooltipPosition = 'top';
      }
    }
  }

  /**
   * Initialize base css class and set initial value
   */
  public ngAfterViewInit(): void {
    this._renderer.addClass(this.sliderCtn.nativeElement, 'slider');
    this._renderer.addClass(this.sliderCtn.nativeElement, `slider-${this.orientation}`);

    this.size = this.sliderCtn.nativeElement[this.sizePos];

    if (!Array.isArray(this._value)) {
      this._value = [this._value as number];
    }
    this.isInitialized = true;
    this.value = this._value;
  }

  @Input()
  public get max(): number {
    return this._max;
  }

  public set max(val: number) {
    this._max = val;
    if (this._value) {
      this.value = this.value;
    }
  }

  @Input()
  public get min(): number {
    return this._min;
  }

  public set min(val: number) {
    this._min = val;
    if (this._value) {
      this.value = this.value;
    }
  }

  @Input()
  public get step(): number {
    return this._step;
  }

  public set step(val: number) {
    this._step = val;
    if (this._value) {
      this.value = this.value;
    }
  }

  @Input()
  public get value(): any {
    return this.type === 'range' ? this._value : this._value[0];
  }

  public set value(val: any) {
    if (!val) {
      val = 0;
    }
    if (this.type === 'slider' && Array.isArray(val)) {
      val = val[0];
    }
    this._value = SliderHelpers.validateInputValue(val);

    if (this.type === 'range') {
      this._value[0] = this.applyPrecision(this._value[0]);
      this._value[1] = this.applyPrecision(this._value[1]);

      this._value[0] = Math.max(this.min, Math.min(this.max, this._value[0]));
      this._value[1] = Math.max(this.min, Math.min(this.max, this._value[1]));
      this._renderer.removeClass(this.maxHandle.nativeElement, 'hide');
    } else {
      val = this.applyPrecision(val);
      this._value = [Math.max(this.min, Math.min(this.max, val))];

      this._renderer.addClass(this.maxHandle.nativeElement, 'hide');
      if (this.selection === 'after') {
        this._value[1] = this.max;
      } else {
        this._value[1] = this.min;
      }
    }

    if (this.max > this.min) {
      this.percentage = [
        this.toPercentage(this._value[0]),
        this.toPercentage(this._value[1]),
        this.step * 100 / (this.max - this.min)
      ];
    } else {
      this.percentage = [0, 0, 100];
    }
    this.propagateChange.next(this.value);
    if (!this.inDrag) {
      this.onChange.emit({
        path: this.path,
        key: this.name,
        value: this.value
      });
    }
    this.layout();
  }

  protected showTooltip(): void {
    if (this.tooltipMode !== 'none') {
      if (this.tooltipSplit) {
        this._renderer.removeClass(this.tooltipMain.nativeElement, 'in');
        this._renderer.addClass(this.tooltipMin.nativeElement, 'in');
        this._renderer.addClass(this.tooltipMax.nativeElement, 'in');

      } else {
        this._renderer.addClass(this.tooltipMain.nativeElement, 'in');
        this._renderer.removeClass(this.tooltipMin.nativeElement, 'in');
        this._renderer.removeClass(this.tooltipMax.nativeElement, 'in');
      }
    }
    this.over = true;
  }

  protected hideTooltip(force: boolean = false): void {
    if ((!this.inDrag && this.tooltipMode !== 'always') || force) {
      this._renderer.removeClass(this.tooltipMain.nativeElement, 'in');
      this._renderer.removeClass(this.tooltipMin.nativeElement, 'in');
      this._renderer.removeClass(this.tooltipMax.nativeElement, 'in');
    }
    this.over = false;
  }

  /**
   * Drag start on mouse down, start to move the handle
   * @param event
   * @returns {boolean}
   */
  protected onMouseDown(event: Event): boolean {
    if (!this.enabled) {
      return false;
    }
    this.onDragStart.emit(event);

    this.offset = this.calculateOffset(this.sliderCtn.nativeElement);
    this.size = this.sliderCtn.nativeElement[this.sizePos];

    const percentage = this.getPercentage(event);

    if (this.type === 'range') {
      const diff1: number = Math.abs(this.percentage[0] - percentage);
      const diff2: number = Math.abs(this.percentage[1] - percentage);
      this.dragged = (diff1 < diff2) ? 0 : 1;
      this.adjustPercentageForRangeSliders(percentage);
    } else {
      this.dragged = 0;
    }
    this.percentage[this.dragged] = percentage;

    this.mouseMoveReference = this.onMouseMove.bind(this);
    this.mouseUpReference = this.onMouseUp.bind(this);

    if (this.eventRemoveCallback['touchmove']) {
      this.eventRemoveCallback['touchmove']();
    }

    if (this.eventRemoveCallback['touchend']) {
      this.eventRemoveCallback['touchend']();
    }

    if (this.eventRemoveCallback['mousemove']) {
      this.eventRemoveCallback['mousemove']();
    }
    if (this.eventRemoveCallback['mouseup']) {
      this.eventRemoveCallback['mouseup']();
    }

    if (this.touchCapable) {
      // Touch: Bind touch events:
      this.eventRemoveCallback['touchmove'] = this._renderer.listen('document', 'touchmove', this.mouseMoveReference);
      this.eventRemoveCallback['touchend'] = this._renderer.listen('document', 'touchend', this.mouseUpReference);
    }
    // Bind mouse events:
    this.eventRemoveCallback['mousemove'] = this._renderer.listen('document', 'mousemove', this.mouseMoveReference);
    this.eventRemoveCallback['mouseup'] = this._renderer.listen('document', 'mouseup', this.mouseUpReference);

    this._renderer.addClass(this.minHandle.nativeElement, 'hover');
    this._renderer.addClass(this.maxHandle.nativeElement, 'hover');

    this.inDrag = true;
    this.value = this.calculateValue(false);
    SliderHelpers.pauseEvent(event);
    return true;
  }

  /**
   * Move handles on arrow keys
   * @param handleIdx
   * @param ev
   * @returns {boolean}
   */
  protected keydown(handleIdx: number, ev: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    let dir: number;
    switch ((ev as any).keyCode) {
      case 37: // left
      case 40: // down
        dir = -1;
        break;
      case 39: // right
      case 38: // up
        dir = 1;
        break;
      default:
        return;
    }

    // use natural arrow keys instead of from min to max
    const ifVerticalAndNotReversed = (this.orientation === 'vertical' && !this.reversed);
    const ifHorizontalAndReversed = (this.orientation === 'horizontal' && this.reversed);

    if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
      dir = -dir;
    }

    let val: any;
    if (this.type === 'range') {
      val = this.value[handleIdx] + dir * this.step;
      val = [(!handleIdx) ? val : this.value[0],
        ( handleIdx) ? val : this.value[1]];
    } else {
      val = this.value + dir * this.step;
    }

    this.value = val;

    SliderHelpers.pauseEvent(ev);

    return false;
  }

  /**
   * Update handle position on mouse move
   * @param event
   * @returns {boolean}
   */
  private onMouseMove(event: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    const percentage = this.getPercentage(event);
    this.adjustPercentageForRangeSliders(percentage);
    this.percentage[this.dragged] = percentage;
    this.layout();

    this.value = this.calculateValue(true);

    return false;
  }

  /**
   * Drag end on mouse up, set final position of handle
   * @returns {boolean}
   */
  private onMouseUp(): boolean {
    if (!this.enabled) {
      return false;
    }

    if (this.eventRemoveCallback['touchmove']) {
      this.eventRemoveCallback['touchmove']();
    }

    if (this.eventRemoveCallback['touchend']) {
      this.eventRemoveCallback['touchend']();
    }

    if (this.eventRemoveCallback['mousemove']) {
      this.eventRemoveCallback['mousemove']();
    }
    if (this.eventRemoveCallback['mouseup']) {
      this.eventRemoveCallback['mouseup']();
    }

    this.inDrag = false;
    if (this.over === false) {
      this.hideTooltip();
    }
    this._renderer.removeClass(this.minHandle.nativeElement, 'hover');
    this._renderer.removeClass(this.maxHandle.nativeElement, 'hover');

    this.value = this.calculateValue(true);
    this.onDragStop.emit(event);
    return false;
  }

  /**
   * Manage the layout of all slider's elements (ticks, labels, handles, tracks)
   */
  private layout(): void {
    if (!this.isInitialized) {
      return;
    }
    // debugger;
    let positionPercentages: Array<number>;

    if (this.tooltipMode === 'always') {
      this.showTooltip();
    }

    if (this.reversed) {
      positionPercentages = [100 - this.percentage[0], this.type === 'range' ? 100 - this.percentage[1] : this.percentage[1]];
    } else {
      positionPercentages = [this.percentage[0], this.percentage[1]];
    }

    this._renderer.setStyle(this.minHandle.nativeElement, this.stylePos, positionPercentages[0] + '%');
    this._renderer.setStyle(this.maxHandle.nativeElement, this.stylePos, positionPercentages[1] + '%');

    this.setTooltipPosition();

    /* Position ticks and labels */
    if (Array.isArray(this.ticks) && this.ticks.length > 0) {
      let styleSize = this.orientation === 'vertical' ? 'height' : 'width';
      let styleMargin = this.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
      let labelSize = this.size / (this.ticks.length - 1);

      if (this.sliderTicksContainer) {
        let extraMargin = 0;
        if (this.ticksPositions.length === 0 && this.sliderLabelsContainer) {
          if (this.orientation !== 'vertical') {
            this._renderer.setStyle(this.sliderLabelsContainer.nativeElement, styleMargin, -labelSize / 2 + 'px');
          }

          extraMargin = this.sliderLabelsContainer.nativeElement.offsetHeight;
        } else {
          // Chidren are position absolute, calculate height by finding the max offsetHeight of a child
          this.labelElements.forEach((label: ElementRef) => {
            if (label.nativeElement.offsetHeight > extraMargin) {
              extraMargin = label.nativeElement.offsetHeight;
            }
          });
        }
        if (this.orientation === 'horizontal') {
          this._renderer.setStyle(this.sliderCtn.nativeElement, 'marginBottom', extraMargin + 'px');
        }
      }

      const ticksArray = this.tickElements.toArray();
      const labelsArray = this.labelElements.toArray();
      for (let i = 0; i < ticksArray.length; i++) {
        const tick = ticksArray[i].nativeElement;
        const label = labelsArray[i] ? labelsArray[i].nativeElement : undefined;
        let percentage: number = this.ticksPositions[i] || this.toPercentage(this.ticks[i]);

        if (this.reversed) {
          percentage = 100 - percentage;
        }

        this._renderer.setStyle(tick, this.stylePos, percentage + '%');

        // Set class labels to denote whether ticks are in the selection
        this._renderer.removeClass(tick, 'in-selection');
        if (this.type !== 'range') {
          if (this.selection === 'after' && percentage >= positionPercentages[0]) {
            this._renderer.addClass(tick, 'in-selection');
          } else if (this.selection === 'before' && percentage <= positionPercentages[0]) {
            this._renderer.addClass(tick, 'in-selection');
          }
        } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
          this._renderer.addClass(tick, 'in-selection');
        }

        if (label) {
          this._renderer.setStyle(label, styleSize, labelSize + 'px');

          if (this.orientation !== 'vertical' && this.ticksPositions[i] !== undefined) {
            this._renderer.setStyle(label, 'position', 'absolute');
            this._renderer.setStyle(label, this.stylePos, percentage + '%');
            this._renderer.setStyle(label, styleMargin, -labelSize / 2 + 'px');
          } else if (this.orientation === 'vertical') {
            this._renderer.setStyle(label, 'marginLeft', this.sliderCtn.nativeElement.offsetLeft + 'px');
            this._renderer.setStyle(this.sliderTicksContainer.nativeElement, 'marginTop', this.sliderCtn.nativeElement.offsetWidth / 2 * -1 + 'px');
          }
        }
      }
    }

    let formattedTooltipVal: string = SliderHelpers.formatter(this.value);
    this.setText(this.tooltipMainInner.nativeElement, formattedTooltipVal);
    if (this.type === 'range') {
      this._renderer.setStyle(this.tooltipMain.nativeElement, this.stylePos, (positionPercentages[1] + positionPercentages[0]) / 2 + '%');

      if (this.orientation === 'vertical') {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }

      if (this.orientation === 'vertical') {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }

      let innerTooltipMinText = SliderHelpers.formatter(this.value[0]);
      this.setText(this.tooltipMinInner.nativeElement, innerTooltipMinText);

      let innerTooltipMaxText = SliderHelpers.formatter(this.value[1]);
      this.setText(this.tooltipMaxInner.nativeElement, innerTooltipMaxText);

      this._renderer.setStyle(this.tooltipMin.nativeElement, this.stylePos, positionPercentages[0] + '%');

      if (this.orientation === 'vertical') {
        this._renderer.setStyle(this.tooltipMin.nativeElement, 'margin-top', -this.tooltipMin.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this._renderer.setStyle(this.tooltipMin.nativeElement, 'margin-left', -this.tooltipMin.nativeElement.offsetWidth / 2 + 'px');
      }

      this._renderer.setStyle(this.tooltipMax.nativeElement, this.stylePos, positionPercentages[1] + '%');

      if (this.orientation === 'vertical') {
        this._renderer.setStyle(this.tooltipMax.nativeElement, 'margin-top', -this.tooltipMax.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this._renderer.setStyle(this.tooltipMax.nativeElement, 'margin-left', -this.tooltipMax.nativeElement.offsetWidth / 2 + 'px');
      }

    } else {

      this._renderer.setStyle(this.tooltipMain.nativeElement, this.stylePos, positionPercentages[0] + '%');

      if (this.orientation === 'vertical') {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-top', -this.tooltipMain.nativeElement.offsetHeight / 2 + 'px');
      } else {
        this._renderer.setStyle(this.tooltipMain.nativeElement, 'margin-left', -this.tooltipMain.nativeElement.offsetWidth / 2 + 'px');
      }
    }

    if (this.orientation === 'vertical') {
      this._renderer.setStyle(this.trackLow.nativeElement, 'top', '0');
      this._renderer.setStyle(this.trackLow.nativeElement, 'height', Math.min(positionPercentages[0], positionPercentages[1]) + '%');

      this._renderer.setStyle(this.trackSelection.nativeElement, 'top', Math.min(positionPercentages[0], positionPercentages[1]) + '%');
      this._renderer.setStyle(this.trackSelection.nativeElement, 'height', Math.abs(positionPercentages[0] - positionPercentages[1]) + '%');

      this._renderer.setStyle(this.trackHigh.nativeElement, 'bottom', '0');
      this._renderer.setStyle(this.trackHigh.nativeElement, 'height', (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%');
    } else {
      this._renderer.setStyle(this.trackLow.nativeElement, 'left', '0');
      this._renderer.setStyle(this.trackLow.nativeElement, 'width', Math.min(positionPercentages[0], positionPercentages[1]) + '%');

      this._renderer.setStyle(this.trackSelection.nativeElement, 'left', Math.min(positionPercentages[0], positionPercentages[1]) + '%');
      this._renderer.setStyle(this.trackSelection.nativeElement, 'width', Math.abs(positionPercentages[0] - positionPercentages[1]) + '%');

      this._renderer.setStyle(this.trackHigh.nativeElement, 'right', '0');
      this._renderer.setStyle(this.trackHigh.nativeElement, 'width', (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%');

      let offset_min = this.tooltipMin.nativeElement.getBoundingClientRect();
      let offset_max = this.tooltipMax.nativeElement.getBoundingClientRect();

      if (this.tooltipPosition === 'bottom') {
        if (offset_min.right > offset_max.left) {
          this._renderer.removeClass(this.tooltipMax.nativeElement, 'bottom');
          this._renderer.addClass(this.tooltipMax.nativeElement, 'top');
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'top', '');
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'bottom', 22 + 'px');
        } else {
          this._renderer.removeClass(this.tooltipMax.nativeElement, 'top');
          this._renderer.addClass(this.tooltipMax.nativeElement, 'bottom');
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'top', this.tooltipMin.nativeElement.style.top);
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'bottom', '');
        }
      } else {
        if (offset_min.right > offset_max.left) {
          this._renderer.removeClass(this.tooltipMax.nativeElement, 'top');
          this._renderer.addClass(this.tooltipMax.nativeElement, 'bottom');
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'top', 18 + 'px');
        } else {
          this._renderer.removeClass(this.tooltipMax.nativeElement, 'bottom');
          this._renderer.addClass(this.tooltipMax.nativeElement, 'top');
          this._renderer.setStyle(this.tooltipMax.nativeElement, 'top', this.tooltipMin.nativeElement.style.top);
        }
      }
    }
  }

  /**
   * Set text on element, use for update tooltip's text
   * @param element
   * @param text
   */
  private setText(element: any, text: string): void {
    if (typeof element.textContent !== 'undefined') {
      element.textContent = text;
    } else if (typeof element.innerText !== 'undefined') {
      element.innerText = text;
    }
  }

  private offsetLeft(obj: any): number {
    return obj.getBoundingClientRect().left;
  }

  private offsetTop(obj: any): number {
    let offsetTop = obj.offsetTop;
    obj = obj.offsetParent;
    while (obj && !isNaN(obj.offsetTop)) {
      offsetTop += obj.offsetTop;
      if (obj.tagName !== 'BODY') {
        offsetTop -= obj.scrollTop;
      }
      obj = obj.offsetParent;
    }
    return offsetTop;
  }

  private calculateOffset(obj: any): any {
    return {
      left: this.offsetLeft(obj),
      top: this.offsetTop(obj)
    };
  }

  /**
   * Retrieve percentage from an event
   * @param ev
   * @returns {number}
   */
  private getPercentage(ev: Event): number {
    if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
      ev = ((ev as any).touches[0] as Event);
    }

    const eventPosition: number = (ev as any)[this.mousePos];
    const sliderOffset: number = this.offset[this.stylePos];
    const distanceToSlide: number = eventPosition - sliderOffset;
    // Calculate what percent of the length the slider handle has slid
    let percentage: number = (distanceToSlide / this.size) * 100;
    percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
    if (this.reversed) {
      percentage = 100 - percentage;
    }

    // Make sure the percent is within the bounds of the slider.
    // 0% corresponds to the 'min' value of the slide
    // 100% corresponds to the 'max' value of the slide
    return Math.max(0, Math.min(100, percentage));
  }

  private adjustPercentageForRangeSliders(percentage: number): void {
    if (this.type === 'range') {
      let precision = SliderHelpers.getNumDigitsAfterDecimalPlace(percentage);
      precision = precision ? precision - 1 : 0;
      const percentageWithAdjustedPrecision = SliderHelpers.applyToFixedAndParseFloat(percentage, precision);
      if (this.dragged === 0 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[1], precision) < percentageWithAdjustedPrecision) {
        this.percentage[0] = this.percentage[1];
        this.dragged = 1;
      } else if (this.dragged === 1 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[0], precision) > percentageWithAdjustedPrecision) {
        this.percentage[1] = this.percentage[0];
        this.dragged = 0;
      }
    }
  }

  /**
   * Calcul the current value of the slider
   * @param snapToClosestTick snap to closest tick value
   * @returns {any} value or array of values
   */
  private calculateValue(snapToClosestTick: boolean): any {
    let val: any;

    if (this.type === 'range') {
      val = [this.min, this.max];
      if (this.percentage[0] !== 0) {
        val[0] = this.toValue(this.percentage[0]);
        val[0] = this.applyPrecision(val[0]);
      }
      if (this.percentage[1] !== 100) {
        val[1] = this.toValue(this.percentage[1]);
        val[1] = this.applyPrecision(val[1]);
      }
    } else {
      val = this.toValue(this.percentage[0]);
      val = parseFloat(val);
      val = this.applyPrecision(val);
    }

    if (snapToClosestTick) {
      let min = [val, Infinity];
      for (let i = 0; i < this.ticks.length; i++) {
        let diff = Math.abs(this.ticks[i] - val);
        if (diff <= min[1]) {
          min = [this.ticks[i], diff];
        }
      }
      if (min[1] <= this.ticksSnapBounds) {
        return min[0];
      }
    }

    return val;
  }

  private applyPrecision(val: number): number {
    const precision = SliderHelpers.getNumDigitsAfterDecimalPlace(this.step);
    return SliderHelpers.applyToFixedAndParseFloat(val, precision);
  }

  /**
   * Transform value to percentage
   * @param value to transform
   * @returns {number} percentage
   */
  private toPercentage(value: number): number {
    if (this.max === this.min) {
      return 0;
    }

    if (this.ticksPositions.length > 0) {
      let minv: number;
      let maxv: number;
      let minp: number;
      let i: number;
      let maxp: number = 0;
      for (i = 0; i < this.ticks.length; i++) {
        if (value <= this.ticks[i]) {
          minv = (i > 0) ? this.ticks[i - 1] : 0;
          minp = (i > 0) ? this.ticksPositions[i - 1] : 0;
          maxv = this.ticks[i];
          maxp = this.ticksPositions[i];

          break;
        }
      }
      if (i > 0) {
        let partialPercentage = (value - minv) / (maxv - minv);
        return minp + partialPercentage * (maxp - minp);
      }
    }

    return 100 * (value - this.min) / (this.max - this.min);
  }

  /**
   * Transform percentage to value
   * @param percentage to transform
   * @returns {number} value
   */
  private toValue(percentage: number): number {
    let rawValue = percentage / 100 * (this.max - this.min);
    let shouldAdjustWithBase = true;

    if (this.ticksPositions.length > 0) {
      let minv: number;
      let maxv: number;
      let minp: number;
      let maxp: number = 0;
      for (let i = 1; i < this.ticksPositions.length; i++) {
        if (percentage <= this.ticksPositions[i]) {
          minv = this.ticks[i - 1];
          minp = this.ticksPositions[i - 1];
          maxv = this.ticks[i];
          maxp = this.ticksPositions[i];

          break;
        }
      }
      let partialPercentage = (percentage - minp) / (maxp - minp);
      rawValue = minv + partialPercentage * (maxv - minv);
      shouldAdjustWithBase = false;
    }

    const adjustment = shouldAdjustWithBase ? this.min : 0;
    const value = adjustment + Math.round(rawValue / this.step) * this.step;
    if (value < this.min) {
      return this.min;
    } else if (value > this.max) {
      return this.max;
    } else {
      return value;
    }
  }

  /**
   * Set tooltip position based on orientation
   */
  private setTooltipPosition(): void {
    const tooltips = [this.tooltipMain, this.tooltipMin, this.tooltipMax];
    if (this.orientation === 'vertical') {
      const tooltipPos = this.tooltipPosition || 'right';
      const oppositeSide = (tooltipPos === 'left') ? 'right' : 'left';
      tooltips.forEach((tooltip: ElementRef) => {
        this._renderer.addClass(tooltip.nativeElement, tooltipPos);
        this._renderer.setStyle(tooltip.nativeElement, oppositeSide, '100%');
      });
    } else if (this.tooltipPosition === 'bottom') {
      tooltips.forEach((tooltip: ElementRef) => {
        this._renderer.addClass(tooltip.nativeElement, 'bottom');
        this._renderer.setStyle(tooltip.nativeElement, 'top', 22 + 'px');
      });
    } else {
      tooltips.forEach((tooltip: ElementRef) => {
        this._renderer.addClass(tooltip.nativeElement, 'top');
        this._renderer.setStyle(tooltip.nativeElement, 'top', -tooltip.nativeElement.style.outerHeight - 14 + 'px');
      });
    }
  }
}
