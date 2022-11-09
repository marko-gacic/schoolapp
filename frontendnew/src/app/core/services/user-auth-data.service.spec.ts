import { TestBed } from '@angular/core/testing';

import { UserAuthDataService } from './user-auth-data.service';

describe('UserAuthDataService', () => {
    let service: UserAuthDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserAuthDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
