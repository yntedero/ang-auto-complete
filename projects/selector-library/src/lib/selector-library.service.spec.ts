import { TestBed } from '@angular/core/testing';

import { SelectorLibraryService } from './selector-library.service';

describe('SelectorLibraryService', () => {
  let service: SelectorLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
