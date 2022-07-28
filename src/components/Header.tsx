import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';

import SearchBar from './SearchBar';
import NavigationSection from './NavigationSection';
import { toggleTheme } from '../store/slices/themeSlice';
import '../styles/containers/header.scss';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';

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
      <div className="img-logo" />
      <SearchBar />
      <NavigationSection />
      <Switch
        sx={{ 'background-color': themeState ? '#f1af03' : 'grey' }}
        checked={themeState}
        onChange={handleThemeChange}
        color="warning"
      />
    </div>
  );
};

export default Header;
