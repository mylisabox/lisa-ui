import {Model} from "./model.type";
import {ChatbotData} from "./chatbot-data.type";

export interface Chatbot extends Model {
  name: string
  displayName?: string
  data: ChatbotData

}
