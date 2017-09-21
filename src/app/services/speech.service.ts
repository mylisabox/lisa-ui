import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {Voice} from "../models/voice.type";
import {Globals} from "../common/globals";
import {Observable} from "rxjs";

@Injectable()
export class SpeechService extends ApiService<Voice> {
  SpeechRecognition: any;
  isListening: boolean;
  private _recognition: any;

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/chatbot');
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  }

  init(onResult: Function): void {
    this._recognition = new this.SpeechRecognition();
    this._recognition.continuous = true;
    this._recognition.interimResults = true;
    this._recognition.onresult = onResult

    this._recognition.onstart = () => {
      this.isListening = true;
    };

    this._recognition.onspeechend = function () {
      this.isListening = false;
    };

    this._recognition.onnomatch = function (event) {
      this.isListening = false;
    };

    this._recognition.onerror = function (event) {
      this.isListening = false;
    };

  }

  start() {
    this._recognition.start();
  }

  stop() {
    this._recognition.stop();
    this.isListening = false;
  }

  sendVoiceCommand(sentence: string) {
    return this._http.post(`${Globals.getUrl(this._path)}/interact`, {
      sentence: sentence
    }, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
