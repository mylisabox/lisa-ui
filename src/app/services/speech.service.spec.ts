/* tslint:disable:no-unused-variable */

import {TestBed, inject} from "@angular/core/testing";
import {SpeechService} from "./speech.service";

describe('SpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechService]
    });
  });

  it('should ...', inject([SpeechService], (service: SpeechService) => {
    expect(service).toBeTruthy();
  }));
});
