import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import HomePage from './pages/Home';
import SignInPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ProductsPage from './pages/Products';
import userReducer from './store/slices/userSlice';

describe('My app', () => {
  it('renders correctly', () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    const queryClient = new QueryClient();

    const renderer = create(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/sign-in']}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<HomePage />} path="/" />
                <Route element={<ProductsPage />} path="/products" />
              </Route>
              <Route element={<SignInPage />} path="/sign-in" />
              <Route element={<SignUpPage />} path="/sign-up" />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
