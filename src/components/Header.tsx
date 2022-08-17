/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

import SearchBar from './SearchBar';
import NavigationSection from './NavigationSection';
import { toggleTheme } from '../store/slices/themeSlice';
import '../styles/containers/header.scss';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';
import MobileMenu from './MobileMenu';
import { useIsSmallDevice } from '../hooks/useWindowSize';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '.MuiSwitch-track': {
    backgroundColor: '#e8f5e9',
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#f1af03',
    backgroundColor: '#FFFFFF',

    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FFFFFF',
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const themeState = useAppSelector(selectThemeStatus);
  const navigate = useNavigate();
  const isSmallDevice = useIsSmallDevice();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={classNames({
        'header-container': true,
        'header-theme-secondary': themeState,
      })}
    >
      {isSmallDevice ? (
        <div className="header-mobile-view">
          <div className="header-mobile-view__children">
            <CustomSwitch checked={themeState} onChange={handleThemeChange} />
            <div
              className="img-logo"
              onKeyDown={() => navigate('/')}
              onClick={() => navigate('/')}
            />
            <MobileMenu />
          </div>
          <SearchBar />
        </div>
      ) : (
        <div className="header-browser-view">
          <div className="img-logo" onKeyDown={() => navigate('/')} onClick={() => navigate('/')} />
          <SearchBar />
          <NavigationSection />
          <CustomSwitch checked={themeState} onChange={handleThemeChange} />
        </div>
      )}
    </div>
  );
};

export default Header;
