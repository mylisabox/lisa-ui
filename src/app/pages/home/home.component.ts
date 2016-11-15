import {Component, OnInit, ViewChild, ElementRef, Renderer} from "@angular/core";
import {Room} from "../../models/room.type";
import {RoomService} from "../../services/room.service";
import {WebsocketService} from "../../interfaces/websocket-service";
import {Subscription} from "rxjs";
import {ConfirmModalComponent} from "../../components/modals/confirm-modal/confirm-modal.component";

const TAB_TYPE = {
  NONE: -1,
  FAV: 0,
  ROOMS: 1,
  NEW_DEVICES: 2
}

@Component({
  selector: 'lisa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('roomsList') roomsList: ElementRef
  @ViewChild('roomInput') roomInput: ElementRef
  @ViewChild('modalDeleteRoom') modalDeleteRoom: ConfirmModalComponent

  private listener: Subscription;
  private _rooms: Room[] = []
  private _currentEditedRoom: Room
  private _currentTab: number
  public tabType = TAB_TYPE

  constructor(private _ngEl: ElementRef,
              private _renderer: Renderer,
              private _api: RoomService,
              private _websocketService: WebsocketService) {
    this._currentTab = TAB_TYPE.FAV
  }

  ngOnInit() {
    this._api.getItems().subscribe((rooms: Room[]) => {
      this._rooms = rooms
    });

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
              this._rooms = this._rooms.filter(room => room.id != event.item.id);
            }
            this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * 40) + 'px');
            break;
          default:
            break;
        }
      });
  }

  loadFavorites() {
    if (this._currentTab === TAB_TYPE.ROOMS) {
      this.toggleRooms();
    }
    this._currentTab = TAB_TYPE.FAV
  }

  loadNewDevices() {
    if (this._currentTab === TAB_TYPE.ROOMS) {
      this.toggleRooms();
    }
    this._currentTab = TAB_TYPE.NEW_DEVICES
  }

  toggleRooms() {
    if (this.roomsList.nativeElement.offsetHeight === 0) {
      this._currentTab = TAB_TYPE.ROOMS
      this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', ((this._rooms.length + 1) * 40) + 'px');
    }
    else {
      this._currentTab = TAB_TYPE.NONE
      this._renderer.setElementStyle(this.roomsList.nativeElement, 'height', '0px');
    }
  }

  addRoom(event) {
    if (!event || event.target != this.roomInput.nativeElement) {
      this._api.postItem({name: this.roomInput.nativeElement.value}).subscribe((room: Room) => {
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
  }

  updateRoom(room: Room, newName: string) {
    room.name = newName;
    this._api.putItem(room).subscribe((room: Room) => {
      this.clearEditRoom();
    });
  }

  retrieveDevicesForRoom(room: Room) {

  }
}
