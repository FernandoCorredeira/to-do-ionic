import { TestBed } from '@angular/core/testing';

import { ServiceTask } from './service-task';

describe('ServiceTask', () => {
  let service: ServiceTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
