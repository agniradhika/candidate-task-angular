import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';
import { UserService } from "../../services/user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let mockStore: MockStore;

  const initialState = { list: []};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
        UserService
      ]
    });
    effects = TestBed.inject(UserEffects);
    mockStore = TestBed.inject((MockStore));
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
