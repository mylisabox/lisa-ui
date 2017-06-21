import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Field} from "../models/field.type";

@Injectable()
export class FieldService {
  constructor() {
  }

  toFormGroup(questions: Field[]) {
    let group: any = {};

    questions.forEach(question => {
      const validator = [];
      if (question.required) {
        validator.push(Validators.required);
      }
      if (question.minLength) {
        validator.push(Validators.minLength(question.minLength));
      }
      if (question.maxLength) {
        validator.push(Validators.maxLength(question.maxLength));
      }
      if (question.regexp) {
        validator.push(Validators.pattern(new RegExp(question.regexp)));
      }
      if (question.type == 'email') {
        validator.push(Validators.email);
      }

      if (question.type == 'url' && !question.regexp) {
        const patterns = {
          protocol: '^(http(s)?(:\/\/))(www\.)?',
          domain: '[a-zA-Z0-9-_\.]+',
          tld: '(\.[a-zA-Z0-9]{2,})',
          params: '([-a-zA-Z0-9:%_\+.,~#?&//=]*)$'
        };

        const urlRegex = new RegExp(patterns.protocol + patterns.domain + patterns.tld + patterns.params, 'gi');
        validator.push(Validators.pattern(urlRegex));
      }

      if (question.type == 'ip' && !question.regexp) {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
        validator.push(Validators.pattern(ipRegex));
      }
      group[question.name] = new FormControl(question.value || question.defaultValue || '', validator);
    });
    return new FormGroup(group);
  }
}
