/* eslint-disable react/jsx-wrap-multilines */

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SignInPage from './pages/Login';
import SignUpPage from './pages/SignUp';

import './App.scss';
import PrivateRoutes from './utils/PrivateRoutes';
import ProductsPage from './pages/Products';

const App = () => (
  <Routes>
    <Route element={<PrivateRoutes />}>
      <Route element={<HomePage />} path="/" />
      <Route element={<ProductsPage />} path="/products" />
    </Route>
    <Route element={<SignInPage />} path="/sign-in" />
    <Route element={<SignUpPage />} path="/sign-up" />
  </Routes>
);

export default App;
