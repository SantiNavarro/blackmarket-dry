import reducer, { signIn, signOut, UserState, initialState } from './userSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    email: '',
    name: '',
    accessToken: '',
    client: '',
    uid: '',
  });
});

test('should handle a signIn adding user info to state', () => {
  const previousState: UserState = initialState;

  expect(
    reducer(
      previousState,
      signIn({
        email: 'santiago.navarro@rootstrap.com',
        name: 'Santi',
        accessToken: '123',
        client: '456',
        uid: 's',
      })
    )
  ).toEqual({
    email: 'santiago.navarro@rootstrap.com',
    name: 'Santi',
    accessToken: '123',
    client: '456',
    uid: 's',
  });
});

test('should handle a signOut returning the user state to empty/initial state', () => {
  const previousState: UserState = {
    email: 'santiago.navarro@rootstrap.com',
    name: 'Santi',
    accessToken: '123',
    client: '456',
    uid: 's',
  };

  expect(reducer(previousState, signOut())).toEqual(initialState);
});
