import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
