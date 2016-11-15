import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string
  @Input() labelButtonCancel: string = 'Cancel'
  @Input() labelButtonOk: string = 'Ok'
  @Output() public onCancel: EventEmitter<ConfirmModalComponent> = new EventEmitter<ConfirmModalComponent>();
  @Output() public onOk: EventEmitter<ConfirmModalComponent> = new EventEmitter<ConfirmModalComponent>();

  ngOnInit() {
  }

}
