import paths from './paths';
import HomePage from '../pages/Home';
import SignInPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';

export interface RouteInterface {
  path: string;
  component: () => JSX.Element;
}

const routes: RouteInterface[] = [
  {
    path: paths.index,
    component: SignInPage,
  },
  {
    path: paths.signUp,
    component: SignUpPage,
  },
  {
    path: paths.signIn,
    component: SignInPage,
  },
];

export default routes;
