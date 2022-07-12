import { lazy } from 'react';
import paths from './paths';

const HomePage = lazy(() => import('../pages/Home/Home'));
const SignInPage = lazy(() => import('../pages/SignIn/SignIn'));
const SignUpPage = lazy(() => import('../pages/SignUp/SignUp'));

interface Route {
  path: string;
  component: JSX.Element;
}

const routes: Route[] = [
  {
    path: paths.index,
    component: <HomePage />,
  },
  {
    path: paths.signUp,
    component: <SignUpPage />,
  },
  {
    path: paths.signIn,
    component: <SignInPage />,
  },
];

export default routes;
