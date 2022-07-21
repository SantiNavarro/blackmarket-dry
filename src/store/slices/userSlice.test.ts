import reducer, { signIn, signOut, UserState, initialState } from './userSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ email: '', name: '' });
});

test('should handle a signIn adding user info to state', () => {
  const previousState: UserState = initialState;

  expect(
    reducer(previousState, signIn({ email: 'santiago.navarro@rootstrap.com', name: 'Santi' }))
  ).toEqual({ email: 'santiago.navarro@rootstrap.com', name: 'Santi' });
});

test('should handle a signOut returning the user state to empty/initial state', () => {
  const previousState: UserState = { email: 'santiago.navarro@rootstrap.com', name: 'Santi' };

  expect(reducer(previousState, signOut())).toEqual(initialState);
});
