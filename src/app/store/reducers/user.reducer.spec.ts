import { UsersReducer } from './user.reducer';
import { UserState } from "../user.state";

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = UsersReducer(UserState, action);

      expect(result).toBe(UserState);
    });
  });
});
