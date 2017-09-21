import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {Field} from "../../models/field.type";
import {FormGroup} from "@angular/forms";
import {SpeechService} from "../../services/speech.service";

@Component({
  selector: 'lisa-speech-input',
  styleUrls: ['./speech-input.component.scss'],
  templateUrl: './speech-input.component.html',
  providers: [SpeechService]
})
export class SpeechInputComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef;
  @Input() form: FormGroup;
  @Input() needFocus: boolean;
  @Input() question: Field;

  constructor(private _speechService: SpeechService) {
    this._speechService.init(event => {
      const last = event.results.length - 1;
      const result = event.results[last];
      const sentence = event.results[last][0].transcript;
      if (this.input.nativeElement.value.length < sentence.length) {
        this.form.controls[this.question.name].setValue(sentence);
      }
      if (result.isFinal) {
        this._speechService.stop();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.needFocus && this.input) {
      this.input.nativeElement.focus();
    }
  }

  listenSpeech(): void {
    if (this._speechService.isListening) {
      this._speechService.stop();
    } else {
      this.input.nativeElement.value = '';
      this._speechService.start();
    }
  }

  getValue(): string {
    return this.input.nativeElement.value;
  }
}

