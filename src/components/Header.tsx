/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
// import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';
import NavigationSection from './NavigationSection';
import { toggleTheme } from '../store/slices/themeSlice';
import '../styles/containers/header.scss';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';
import MobileMenu from './MobileMenu';
import { useIsSmallDevice } from '../hooks/useWindowSize';

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
            <Switch
              sx={{ backgroundColor: themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
              checked={themeState}
              onChange={handleThemeChange}
              color="warning"
            />
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
          <Switch
            sx={{ backgroundColor: themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
            checked={themeState}
            onChange={handleThemeChange}
            color="warning"
          />
        </div>
      )}
    </div>
  );
  // return (
  //   <div
  //     className={classNames({
  //       'header-container': true,
  //       'header-theme-secondary': themeState,
  //     })}
  //   >
  //     <BrowserView className="header-browser-view">
  //       <div className="img-logo" onKeyDown={() => navigate('/')} onClick={() => navigate('/')} />
  //       <SearchBar />
  //       <NavigationSection />
  //       <Switch
  //         sx={{ backgroundColor: themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
  //         checked={themeState}
  //         onChange={handleThemeChange}
  //         color="warning"
  //       />
  //     </BrowserView>
  //     <MobileView className="header-mobile-view">
  //       <div className="header-mobile-view__children">
  //         <Switch
  //           sx={{ backgroundColor: themeState ? '#f1af03' : 'grey', margin: '1rem 0' }}
  //           checked={themeState}
  //           onChange={handleThemeChange}
  //           color="warning"
  //         />
  //         <div className="img-logo" onKeyDown={() => navigate('/')} onClick={() => navigate('/')} />
  //         <MobileMenu />
  //       </div>
  //       <SearchBar />
  //     </MobileView>
  //   </div>
  // );
};

export default Header;
