import { TestBed } from '@angular/core/testing';

import { WorkspaceInviteService } from './workspace-invite.service';

describe('WorkspaceInviteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkspaceInviteService = TestBed.get(WorkspaceInviteService);
    expect(service).toBeTruthy();
  });
});
