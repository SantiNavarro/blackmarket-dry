import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { BrowserView, MobileView } from 'react-device-detect';

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
          <div className="img-logo" />
          <MobileMenu />
        </div>
        <SearchBar />
      </MobileView>
      <BrowserView className="header-browser-view">
        <div className="img-logo" />
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
