import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {
  @Input() device: Device
  private _isEditMode: boolean = false;
  private _isToolbarOpen: boolean = false;
  @Output() onRemove: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onRename: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onFavorite: EventEmitter<Device> = new EventEmitter<Device>();

  constructor() {
  }

  ngOnInit() {
  }

  removeFromDashboard() {
    this.onRemove.emit(this.device);
  }

  updateName(name: string) {
    if (this.device.name != name) {
      this.device.name = name;
      this.onRename.emit(this.device);
    }
    this._isEditMode = false;
    this._isToolbarOpen = false;
  }

  toggleFavorite() {
    this.onFavorite.emit(this.device);
    this.device.isFavorite = !this.device.isFavorite;
  }

}
