import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Field} from "../../models/field.type";

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
    if (this.needFocus) {
      this.input.nativeElement.focus();
    }
  }

}

