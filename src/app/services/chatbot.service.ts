import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Chatbot} from "../models/chatbot.type";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChatbotService extends ApiService<Chatbot> {

  constructor(protected _http: HttpClient,
              protected _authService: AuthService) {
    super(_http, _authService, '/chatbot/userBot')
  }

}
