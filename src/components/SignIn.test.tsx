import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userReducer from '../store/slices/userSlice';
import SignIn from './SignIn';

test('renders Sign in component', () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  const queryClient = new QueryClient();

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/sign-in']}>
          <SignIn />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
  //   const signInContainerElement = container.getElementsByClassName('basic-form-position');
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const loginElement = screen.getByText(/log in/i);

  fireEvent.change(emailInputElement, { target: { value: 'santiago.navarro@rootstrap.com' } });
  fireEvent.change(passwordInputElement, { target: { value: '123456' } });
  fireEvent.click(loginElement);
  //   console.log(signInContainerElement);
  //   console.log(signInContainerElement.item(0));
  //   console.log(signInContainerElement.length);

  const loginButton = screen.getByText(/Log in/i);
  expect(loginButton).toBeInTheDocument();
});
