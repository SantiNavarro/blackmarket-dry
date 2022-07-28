import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import '../styles/containers/navigationSection.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { signOut } from '../store/slices/userSlice';

const NavigationDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeState = useAppSelector(selectThemeStatus);

  const pickRoute = (value: string) => {
    const routes: any = {
      'My Account': '/my-account',
      'Cart history': '/cart-history',
      'Payment methods': '/payment-methods',
    };
    return routes[value] || '/';
  };
  const handleChange = (event: any) => {
    if (event.target.value === 'Log out') {
      dispatch(signOut());
      navigate('/sign-in');
    } else {
      navigate(pickRoute(event.target.value));
    }
  };

  return (
    <>
      <select
        className={classNames({
          select: true,
          'select-secondary': themeState,
        })}
        onChange={(event: any) => handleChange(event)}
        name="select"
      >
        <option value="My Account">My Account</option>
        <option value="Cart history">Cart history</option>
        <option value="Payment methods">Payment methods</option>
        <option value="Log out">Log out</option>
      </select>
      <button
        className={classNames({
          'shopping-button': true,
          'shopping-button-secondary': themeState,
        })}
        type="submit"
      >
        Shopping Cart
        <ShoppingCartIcon />
      </button>
    </>
  );
};

export default NavigationDropDown;
