import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AddDeviceModalComponent} from "./add-device-modal.component";

describe('AddDeviceModalComponent', () => {
  let component: AddDeviceModalComponent;
  let fixture: ComponentFixture<AddDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
