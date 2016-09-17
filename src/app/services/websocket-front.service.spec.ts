/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {WebsocketFrontService} from './websocket-front.service';

describe('Service: WebsocketFront', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketFrontService]
    });
  });

  it('should ...', inject([WebsocketFrontService], (service: WebsocketFrontService) => {
    expect(service).toBeTruthy();
  }));
});
