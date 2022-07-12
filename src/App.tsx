/* eslint-disable react/jsx-wrap-multilines */
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/Home';
import SignInPage from './pages/Login';
import SignUpPage from './pages/SignUp';

import './App.scss';
// import routes, { RouteInterface } from './routes';

const App = () => (
  <Routes>
    <Route
      // index={route.path === paths.index}
      path="/"
      element={
        <Suspense fallback={<p>Loading...</p>}>
          <SignInPage />
        </Suspense>
      }
    />
    <Route
      // index={route.path === paths.index}
      path="/sign-in"
      element={
        <Suspense fallback={<p>Loading...</p>}>
          <SignInPage />
        </Suspense>
      }
    />
    <Route
      // index={route.path === paths.index}
      path="/sign-up"
      element={
        <Suspense fallback={<p>Loading...</p>}>
          <SignUpPage />
        </Suspense>
      }
    />
  </Routes>
);

export default App;
