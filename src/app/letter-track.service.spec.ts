import { TestBed } from '@angular/core/testing';

import { LetterTrackService } from './letter-track.service';

describe('LetterTrackService', () => {
  let service: LetterTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
