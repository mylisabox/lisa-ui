import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Device} from "../../../models/device.type";

@Component({
  selector: 'lisa-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {
  _isToolbarOpen: boolean = false;
  _isEditMode: boolean = false;
  @Input() device: Device;
  @Output() onRemove: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onRename: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onFavorite: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() onEditMode: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.setEditMode(false);
    this._isToolbarOpen = false;
  }

  toggleEditMode() {
    this.setEditMode(!this._isEditMode);
  }

  setEditMode(enabled) {
    this._isEditMode = enabled;
    this.onEditMode.next(this._isEditMode);
  }

  toggleFavorite() {
    this.onFavorite.emit(this.device);
    this.device.isFavorite = !this.device.isFavorite;
  }

}
