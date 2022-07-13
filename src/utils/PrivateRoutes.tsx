import { Outlet, Navigate } from 'react-router-dom';
import { selectUserData } from '../store/features/api/selectors';
import { useAppSelector } from '../store/hooks';

const PrivateRoutes = () => {
  const userState = useAppSelector(selectUserData);

  return userState.email ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
