import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import paths from './routes/paths';

import './App.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(route => (
        <Route
          index={route.path === paths.index}
          path={route.path}
          element={<Suspense fallback={<p>Loading...</p>}>{route.component}</Suspense>}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;
