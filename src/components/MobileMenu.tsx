/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, MouseEvent } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pickRoute } from '../utils/businessLogic';
import { signOut } from '../store/slices/userSlice';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { useAppSelector } from '../store/hooks';
import '../styles/containers/mobileMenu.scss';
import { clearCart } from '../store/slices/cartSlice';

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeState = useAppSelector(selectThemeStatus);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    if (event.target.value === 'Log out') {
      dispatch(signOut());
      dispatch(clearCart());
      navigate('/sign-in');
    } else {
      navigate(pickRoute(event.target.value));
    }
    setAnchorEl(null);
  };

  return (
    <div className="mobile-menu">
      <button
        className={classNames({
          'mobile-menu-vertical-button': true,
          'mobile-menu-vertical-button-secondary': themeState,
        })}
        type="button"
        onClick={() => navigate('/cart')}
      >
        <ShoppingCartIcon />
      </button>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon
          className={classNames({
            'mobile-menu-vertical-button': true,
            'mobile-menu-vertical-button-secondary': themeState,
          })}
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem defaultValue="My Account" onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem defaultValue="Cart history" onClick={handleClose}>
          Cart history
        </MenuItem>
        <MenuItem defaultValue="Payment methods" onClick={handleClose}>
          Payment methods
        </MenuItem>
        <MenuItem defaultValue="Log out" onClick={handleClose}>
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileMenu;
