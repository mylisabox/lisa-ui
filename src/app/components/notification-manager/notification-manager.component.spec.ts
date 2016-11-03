/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {NotificationManagerComponent} from './notification-manager.component';

describe('NotificationManagerComponent', () => {
  let component: NotificationManagerComponent;
  let fixture: ComponentFixture<NotificationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
