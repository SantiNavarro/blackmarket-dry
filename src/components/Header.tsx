/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { BrowserView, MobileView } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';
import NavigationSection from './NavigationSection';
import { toggleTheme } from '../store/slices/themeSlice';
import '../styles/containers/header.scss';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';
import MobileMenu from './MobileMenu';

const Header = () => {
  const dispatch = useDispatch();
  const themeState = useAppSelector(selectThemeStatus);
  const navigate = useNavigate();
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
      <MobileView className="header-mobile-view">
        <div className="header-mobile-view__children">
          <Switch
            sx={{ 'background-color': themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
            checked={themeState}
            onChange={handleThemeChange}
            color="warning"
          />
          <div className="img-logo" onKeyDown={() => navigate('/')} onClick={() => navigate('/')} />
          <MobileMenu />
        </div>
        <SearchBar />
      </MobileView>
      <BrowserView className="header-browser-view">
        <div className="img-logo" onKeyDown={() => navigate('/')} onClick={() => navigate('/')} />
        <SearchBar />
        <NavigationSection />
        <Switch
          sx={{ 'background-color': themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
          checked={themeState}
          onChange={handleThemeChange}
          color="warning"
        />
      </BrowserView>
    </div>
  );
};

export default Header;
