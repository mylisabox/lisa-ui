import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer, Renderer2, ViewChild} from "@angular/core";
import {Room} from "../../models/room.type";
import {RoomService} from "../../services/room.service";
import {WebsocketService} from "../../interfaces/websocket-service";
import {Subscription} from "rxjs";
import {ConfirmModalComponent} from "../../components/modals/confirm-modal/confirm-modal.component";
import {Device} from "../../models/device.type";
import {DashboardComponent} from "ngx-dashboard";
import {DeviceService} from "../../services/device.service";
import {WidgetLISAComponent} from "../../components/widget/widget.component";
import "rxjs/add/operator/catch";
import {FavoriteService} from "../../services/favorite.service";
import {DashboardService} from "../../services/dashboard.service";
import {AuthService} from "../../services/auth.service";
import {Dashboard} from "../../models/dashboard.type";
import {WidgetEvent} from "../../interfaces/widget-event.type";
import {AddDeviceModalComponent} from "../../components/modals/add-device-modal/add-device-modal.component";

const TAB_TYPE = {
  NONE: -1,
  FAV: 0,
  ROOMS: 1,
  NEW_DEVICES: 2
};

const WIDGET_HEIGHT = 200;

const ROOM_LINE_HEIGHT = 42.5;

@Component({
  selector: 'lisa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '(window:resize)': '_onResize()'
  }
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('roomsList') roomsList: ElementRef;
  @ViewChild('roomInput') roomInput: ElementRef;
  @ViewChild('dashboard') dashboard: DashboardComponent;
  @ViewChild('modalDeleteRoom') modalDeleteRoom: ConfirmModalComponent;
  @ViewChild('modalAddDevice') modalAddDevice: AddDeviceModalComponent;
  @Input() widgetsSize: number[] = [300, WIDGET_HEIGHT];
  @Input() dashboardMargin: number = 10;
  _currentTab: number = TAB_TYPE.FAV;
  _roomsListOpen = false;
  _rooms: Room[] = [];
  _currentEditedRoom: Room;

  private _devices: Device[] = [];
  private _favorites: Device[] = [];
  private _currentDashboard: Dashboard;

  private listener: Subscription;
  private _currentSelectedRoom: Room;
  public tabType = TAB_TYPE;

  constructor(private _deviveApi: DeviceService,
              private _ngEl: ElementRef,
              private _renderer: Renderer2,
              private _roomApi: RoomService,
              private _authService: AuthService,
              private _dashboardApi: DashboardService,
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
            this._renderer.setStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * ROOM_LINE_HEIGHT) + 'px');
            break;
          case 'device':
            if (event.command === 'create') {
              if (this._currentSelectedRoom.id == event.item.roomId) {
                this._devices.push(event.item);
                this._showDevice(event.item);
              }
            }
            else if (event.command === 'update') {
              if (!this._currentSelectedRoom || //= favorite tab
                this._currentSelectedRoom == event.item.roomId || //= new devices
                (this._currentSelectedRoom && this._currentSelectedRoom.id == event.item.roomId)) { // = room devices
                const device = this._devices.find(item => item.id == event.item.id);

                if (device) {
                  device.name = event.item.name || device.name;
                  device.data = event.item.data || device.data;
                  device.roomId = event.item.roomId || device.roomId;
                  device.template = event.item.template || device.template;

                  let widget = this.dashboard.getWidgetById(device.id) as WidgetLISAComponent
                  widget.disableEvent();
                  widget.device = device;
                  widget.enableEvent();
                }
              }
              else {
                this.dashboard.removeItemById(event.item.id);
              }
            }
            else if (event.command === 'destroy') {
              this.dashboard.removeItemById(event.item.id);
            }
            break;
          default:
            break;
        }
      });
    this.loadFavorites();
  }

  ngAfterViewInit(): void {
    this.dashboard.onDrag.subscribe(event => {
      //TODO check if above a room line to move it into that room
    });
  }

  showAddDevice() {
    this.modalAddDevice.show(this._currentSelectedRoom ? this._currentSelectedRoom.id : null);
  }

  loadFavorites() {
    if (this._currentTab === TAB_TYPE.ROOMS) {
      this.toggleRooms();
    }

    this._dashboardApi.getOrderedDeviceForRoom().subscribe(
      dashboard => {
        console.log(dashboard);
        this._currentDashboard = dashboard;
        dashboard.widgets.map(widget => widget.isFavorite = true);
        this._favorites = dashboard.widgets;
        this._showDevices(dashboard.widgets);
      },
      err => console.log(err)
    );
    this.dashboard.enableDrag();
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
    this.dashboard.disableDrag();
    this._currentTab = TAB_TYPE.NEW_DEVICES;
    this._currentSelectedRoom = null;
    this._currentEditedRoom = null;
  }

  toggleRooms() {
    if (this.roomsList.nativeElement.offsetHeight === 0) {
      this._roomsListOpen = true;
      this._renderer.setStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * ROOM_LINE_HEIGHT) + 'px');
    }
    else {
      this._roomsListOpen = false;
      this._renderer.setStyle(this.roomsList.nativeElement, 'height', '0px');
    }
  }

  addRoom(event) {
    if (this.roomInput.nativeElement.value != "") {
      if (!event || event.target != this.roomInput.nativeElement) {
        this._roomApi.postItem({name: this.roomInput.nativeElement.value}).subscribe((room: Room) => {
          this.roomInput.nativeElement.value = '';
        });
      }
    }
  }

  onDeviceValueChanged(widgetEvent: WidgetEvent) {
    if (widgetEvent.device.type.indexOf('group_') == -1) {
      this._deviveApi.postDeviceValue(widgetEvent).subscribe(
        data => {

        },
        err => {
          console.log(err);
        })
    } else {
      this._deviveApi.postGroupValue(this._currentSelectedRoom.id, widgetEvent).subscribe(
        data => {

        },
        err => {
          console.log(err);
        })
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
    this._currentTab = TAB_TYPE.ROOMS;
    this.dashboard.enableDrag();
    if (this._currentSelectedRoom != room) {
      this._currentSelectedRoom = room;
      this._dashboardApi.getOrderedDeviceForRoom(this._currentSelectedRoom.id).subscribe(
        dashboard => {
          console.log(dashboard);
          this._currentDashboard = dashboard;
          this._showDevices(dashboard.widgets);
        },
        err => console.log(err)
      );
    }
  }

  private _onResize() {
    if (window.innerWidth < 500) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width - this.dashboardMargin, WIDGET_HEIGHT];
    }
    else if (window.innerWidth < 750) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width / 2 - this.dashboardMargin, WIDGET_HEIGHT];
    }
    else {
      this.dashboardMargin = 20;
      const nbColumn = Math.floor(this.dashboard.width / (300 + this.dashboardMargin));
      this.widgetsSize = [this.dashboard.width / nbColumn - this.dashboardMargin, WIDGET_HEIGHT];
    }
  }

  saveWidgetOrder(order: Array<string>) {
    this._dashboardApi.saveDevicesOrderForRoom(this._currentSelectedRoom ? this._currentSelectedRoom.id : '', order).subscribe(
      data => {
        console.log(data)
      },
      err => console.log(err)
    );
  }

  private _showDevices(devices: Device[]) {
    this.dashboard.clearItems();
    this._devices = devices;
    this._devices.forEach(device => {
      device.isFavorite = this._favorites.find(fav => device.id == fav.id) != null;
      this._showDevice(device);
    });
  }

  private _showDevice(device: Device) {
    const ref: WidgetLISAComponent = this.dashboard.addItem(WidgetLISAComponent) as WidgetLISAComponent;
    ref.device = device;
    ref.widgetId = device.id;
    ref.onChange.subscribe(widgetEvent => this.onDeviceValueChanged(widgetEvent));

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
  }
}
