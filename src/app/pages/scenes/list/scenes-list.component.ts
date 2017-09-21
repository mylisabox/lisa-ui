import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ChatbotService} from "../../../services/chatbot.service";
import {Chatbot} from "../../../models/chatbot.type";

@Component({
  selector: 'lisa-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss']
})
export class ScenesListComponent implements OnInit, AfterViewInit {
  states: Array<Chatbot> = []

  constructor(private _chatbotApi: ChatbotService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.reloadItems();
  }

  remove(bot: Chatbot) {
    this._chatbotApi.destroyItem(bot.name).subscribe(() => {
      this.reloadItems();
    }, error => console.log(error))
  }

  goToAddScene(bot: Chatbot) {
    const options = {}
    if (bot) {
      options['bot'] = JSON.stringify(bot);
    }
    this._router.navigate(['/scenes/form', options]);
  }

  private reloadItems(): void {
    this._chatbotApi.getItems().subscribe(data => {
      if (data) {
        this.states = data
      }
    }, error => {
      console.log(error)
    })
  }

}
