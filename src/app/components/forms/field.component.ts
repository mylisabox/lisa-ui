import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Field} from "../../models/field.type";
import {SpeechInputComponent} from "./speech-input.component";

@Component({
  selector: 'lisa-field',
  styleUrls: ['./field.component.scss'],
  templateUrl: './field.component.html'
})
export class FieldComponent implements AfterViewInit {
  @Input() question: Field;
  @Input() needFocus: boolean;
  @Input() form: FormGroup;
  @ViewChild('input') input: ElementRef;
  @ViewChild('speech') speech: SpeechInputComponent;
  @ViewChild('select') select: ElementRef;

  get error() {
    const errors: any = this.form.controls[this.question.name].errors;
    let error;
    if (errors.required) {
      error = `${this.question.label} is required`;
    }
    else if (errors.email) {
      error = `${this.question.label} is not a correct email`;
    }
    else if (errors.minlength) {
      error = `${this.question.label} should have a minimum of ${errors.minlength.requiredLength} characters`;
    }
    else if (errors.maxlength) {
      error = `${this.question.label} should have a maximum of ${errors.maxlength.requiredLength} characters`;
    }
    else if (errors.pattern) {
      error = `${this.question.label} is not correct`;
    }
    return error;
  }

  ngAfterViewInit(): void {
    if (this.needFocus && this.input) {
      this.input.nativeElement.focus();
    }
  }

  getValue(): any {
    if (this.input) {
      return this.input.nativeElement.value;
    }
    else if (this.select) {
      return this.select.nativeElement.value;
    } else {
      return this.speech.getValue();
    }
  }
}

