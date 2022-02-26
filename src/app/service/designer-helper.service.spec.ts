import { TestBed } from '@angular/core/testing';

import { DesignerHelperService } from './designer-helper.service';

describe('DesignerHelperService', () => {
  let service: DesignerHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignerHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
