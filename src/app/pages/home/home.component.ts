import {Component, OnInit, ViewChild, ElementRef, Renderer, Input} from "@angular/core";
import {Room} from "../../models/room.type";
import {RoomService} from "../../services/room.service";
import {WebsocketService} from "../../interfaces/websocket-service";
import {Subscription} from "rxjs";
import {ConfirmModalComponent} from "../../components/modals/confirm-modal/confirm-modal.component";
import {Device} from "../../models/device.type";
import {DashboardComponent} from "ng2-dashboard";
import {DeviceService} from "../../services/device.service";
import {WidgetLISAComponent} from "../../components/widget/widget.component";
import "rxjs/add/operator/catch";
import {FavoriteService} from "../../services/favorite.service";

const TAB_TYPE = {
  NONE: -1,
  FAV: 0,
  ROOMS: 1,
  NEW_DEVICES: 2
}

@Component({
  selector: 'lisa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '(window:resize)': '_onResize()'
  }
})
export class HomeComponent implements OnInit {
  @ViewChild('roomsList') roomsList: ElementRef;
  @ViewChild('roomInput') roomInput: ElementRef;
  @ViewChild('dashboard') dashboard: DashboardComponent;
  @ViewChild('modalDeleteRoom') modalDeleteRoom: ConfirmModalComponent;
  @Input() widgetsSize: number[] = [300, 150];
  @Input() dashboardMargin: number = 10;
  private _devices: Device[] = [];

  private listener: Subscription;
  private _rooms: Room[] = [];
  private _currentEditedRoom: Room;
  private _currentSelectedRoom: Room;
  private _currentTab: number = TAB_TYPE.FAV;
  public tabType = TAB_TYPE;

  constructor(private _ngEl: ElementRef,
              private _renderer: Renderer,
              private _roomApi: RoomService,
              private _deviceApi: DeviceService,
              private _favoriteApi: FavoriteService,
              private _websocketService: WebsocketService) {
    this._currentTab = TAB_TYPE.FAV
  }

  ngOnInit() {
    this._onResize();
    this._roomApi.getItems().subscribe(
      (rooms: Room[]) => {
        this._rooms = rooms
      },
      err => console.log(err)
    );

    this.listener = this._websocketService.getEmitter()
      .subscribe(event => {
        switch (event.type) {
          case 'room':
            if (event.command === 'create') {
              this._rooms.push(event.item);
            }
            else if (event.command === 'update') {
              this._rooms = this._rooms.map(room => room.id === event.item.id ? event.item : room);
            }
            else if (event.command === 'destroy') {
              this._rooms = this._rooms.filter(room => room.id != event.item);
            }
            this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * 40) + 'px');
            break;
          default:
            break;
        }
      });
    this.loadFavorites();
  }

  loadFavorites() {
    if (this._currentTab === TAB_TYPE.ROOMS) {
      this.toggleRooms();
    }
    this._favoriteApi.getItems().subscribe(
      devices => {
        this._showDevices(devices);
      },
      err => console.log(err));
    this._currentTab = TAB_TYPE.FAV;
    this._currentSelectedRoom = null;
    this._currentEditedRoom = null;
  }

  loadNewDevices() {
    if (this._currentTab === TAB_TYPE.ROOMS) {
      this.toggleRooms();
    }
    this._deviceApi.getDevicesWithoutRoom().subscribe(
      devices => {
        this._showDevices(devices);
      },
      err => console.log(err)
    );
    this._currentTab = TAB_TYPE.NEW_DEVICES;
    this._currentSelectedRoom = null;
    this._currentEditedRoom = null;
  }

  toggleRooms() {
    if (this.roomsList.nativeElement.offsetHeight === 0) {
      this._currentTab = TAB_TYPE.ROOMS;
      this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * 40) + 'px');
    }
    else {
      this._currentTab = TAB_TYPE.NONE;
      this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', '0px');
    }
  }

  addRoom(event) {
    if (!event || event.target != this.roomInput.nativeElement) {
      this._roomApi.postItem({name: this.roomInput.nativeElement.value}).subscribe((room: Room) => {
        this.roomInput.nativeElement.value = '';
      });
    }
  }

  editRoom(room) {
    this._currentEditedRoom = room;
  }

  clearEditRoom() {
    this._currentEditedRoom = null;
  }

  askForRemoveRoom(room: Room) {
    console.log('TODO askForRemoveRoom');
    this._roomApi.destroyItem(room.id).subscribe(
      (room: Room) => {
        this.clearEditRoom();
      },
      err => console.log(err)
    );
  }

  updateRoom(room: Room, newName: string) {
    room.name = newName;
    this._roomApi.putItem(room).subscribe(
      (room: Room) => {
        this.clearEditRoom();
      },
      err => console.log(err)
    );
  }

  retrieveDevicesForRoom(room: Room) {
    if (this._currentSelectedRoom != room) {
      this._currentSelectedRoom = room;
      this._roomApi.getRoomDevices(room.id).subscribe(
        (devices: Device[]) => {
          this._showDevices(devices);
        },
        err => console.log(err)
      );
    }
  }

  private _onResize() {
    if (window.innerWidth < 500) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width - this.dashboardMargin, 150];
    }
    else if (window.innerWidth < 750) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width / 2 - this.dashboardMargin, 150];
    }
    else {
      this.dashboardMargin = 20;
      const nbColumn = Math.floor(this.dashboard.width / (300 + this.dashboardMargin));
      this.widgetsSize = [this.dashboard.width / nbColumn - this.dashboardMargin, 150];
    }
  }

  private _showDevices(devices: Device[]) {
    this.dashboard.clearItems();
    this._devices = devices;
    this._devices.forEach(device => {
      const ref: WidgetLISAComponent = this.dashboard.addItem(WidgetLISAComponent) as WidgetLISAComponent;
      ref.device = device;
      ref.widgetId = device.id;
      ref.onFavorite.subscribe(device => {
        if (device.isFavorite) {
          this._favoriteApi.destroyItem(device.id).subscribe(
            () => {
              if (this._currentTab === TAB_TYPE.FAV) {
                this.dashboard.removeItemById(device.id);
              }
            },
            err => console.log(err)
          );
        }
        else {
          this._favoriteApi.putItem(device).subscribe(
            device => {

            },
            err => console.log(err)
          );
        }
      });
      ref.onRename.subscribe(updatedDevice => {
        this._deviceApi.patchItem(<Device>{id: updatedDevice.id, name: updatedDevice.name}).subscribe(
          data => {
            this._devices = this._devices.map(device => {
              if (device.id == updatedDevice.id) {
                device.name = updatedDevice.name;
              }
              return device;
            })
          },
          err => {
            console.log(err);
          }
        );
      });
      ref.onRemove.subscribe(device => {
        this.dashboard.removeItemById(device.id);
        this._deviceApi.destroyItem(device.id).subscribe(
          data => {

          },
          err => {
            console.log(err);
          }
        );
      });
    });
  }
}
