import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Field} from "../../../models/field.type";
import {FormGroup, Validators} from "@angular/forms";
import {FieldService} from "../../../services/field-service";
import {FieldComponent} from "../../../components/forms/field.component";
import {ChatbotService} from "../../../services/chatbot.service";
import {Chatbot} from "../../../models/chatbot.type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'lisa-scenes-form',
  templateUrl: './scenes-form.component.html',
  styleUrls: ['./scenes-form.component.scss'],
  providers: [FieldService]
})
export class ScenesFormComponent implements OnInit, AfterViewInit {
  @ViewChild('sentenceInput') sentenceInput: FieldComponent;
  @ViewChild('responseInput') responseInput: FieldComponent;
  @ViewChild('commandInput') commandInput: FieldComponent;

  questions: Array<Field> = [];
  form: FormGroup;
  sentences: Array<String> = [];
  responses: Array<String> = [];
  commands: Array<String> = [];
  error: string;

  constructor(private _route: ActivatedRoute,
              private _fieldService: FieldService,
              private _chatbotService: ChatbotService) {

    this.questions.push({
      controlType: 'textbox',
      name: 'displayName',
      label: 'Name',
      //options?: object,
      minLength: 3,
      maxLength: 20,
      //regexp?: string,
      type: 'text',
      required: true
    } as Field);

    this.questions.push({
      controlType: 'speech',
      name: 'sentence',
      label: 'Sentence',
      //options?: object,
      minLength: 3,
      //regexp?: string,
      type: 'text',
      required: true
    } as Field);

    this.questions.push({
      controlType: 'speech',
      name: 'response',
      label: 'Response',
      //options?: object,
      minLength: 3,
      //regexp?: string,
      type: 'text',
      required: true
    } as Field);

    this.questions.push({
      controlType: 'speech',
      name: 'command',
      label: 'Additional command to execute',
      //options?: object,
      minLength: 3,
      //regexp?: string,
      type: 'text',
      required: true
    } as Field);

    this.questions.push({
      controlType: 'textbox',
      name: 'name',
      type: 'hidden'
    } as Field);

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      debugger;
      if (params['bot']) {
        const bot = JSON.parse(params['bot']);
        this.questions[0].value = bot.displayName;
        this.questions[1].required = false;
        this.questions[2].required = false;
        this.questions[3].required = false;
        this.questions[4].value = bot.name;
        this.sentences = bot.data.sentences;
        this.responses = bot.data.responses;
        this.commands = bot.data.commands;

      }
      this.form = this._fieldService.toFormGroup(this.questions);
    });
  }

  addSentence(): boolean {
    const value = this.sentenceInput.getValue();
    const field = this.form.controls.sentence;

    if (value && value !== '' && this.sentences.indexOf(value) === -1) {
      this.sentences.push(value);
      field.clearValidators();
    }
    return false;
  }

  addResponse(): boolean {
    const value = this.responseInput.getValue();
    const field = this.form.controls.response;

    if (value && value !== '' && this.responses.indexOf(value) === -1) {
      this.responses.push(value);
      field.clearValidators();
    }
    return false;
  }

  addCommand(): boolean {
    const value = this.commandInput.getValue();
    const field = this.form.controls.command;
    if (value && value !== '' && this.commands.indexOf(value) === -1) {
      this.commands.push(value);
      field.clearValidators();
    }
    return false;
  }

  removeSentence(index: number): void {
    const field = this.form.controls.sentence;
    this.sentences.splice(index, 1);
    if (this.sentences.length === 0) {
      field.setValidators(Validators.required)
    }
  }

  removeResponse(index: number): void {
    const field = this.form.controls.response;
    this.responses.splice(index, 1);
    if (this.responses.length === 0) {
      field.setValidators(Validators.required)
    }
  }

  removeCommand(index: number): void {
    const field = this.form.controls.command;
    this.commands.splice(index, 1);
    if (this.commands.length === 0) {
      field.setValidators(Validators.required)
    }
  }

  back(): void {
    history.back();
  }

  next(): void {
    if (this.form.valid) {
      this._chatbotService.postItem({
        name: this.form.controls.name.value,
        displayName: this.form.controls.displayName.value,
        data: {
          sentences: this.sentences,
          responses: this.responses,
          commands: this.commands
        }
      } as Chatbot).subscribe(() => {
        this.back()
      }, error => {
        this.error = error
      })
    }
  }

  ngAfterViewInit(): void {
  }
}
