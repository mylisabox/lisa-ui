import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Chatbot} from "../models/chatbot.type";

@Injectable()
export class ChatbotService extends ApiService<Chatbot> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/chatbot/userBot')
  }

}
