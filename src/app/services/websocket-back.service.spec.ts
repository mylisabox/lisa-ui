/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {WebsocketBackService} from './websocket-back.service';

describe('Service: WebsocketBack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketBackService]
    });
  });

  it('should ...', inject([WebsocketBackService], (service: WebsocketBackService) => {
    expect(service).toBeTruthy();
  }));
});
