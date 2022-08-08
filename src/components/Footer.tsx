import classNames from 'classnames/bind';
import footerElements from '../utils/footerElements.json';
import NavList from './NavList';
import '../styles/containers/footer.scss';
import { useAppSelector } from '../store/hooks';
import { selectThemeStatus } from '../store/features/theme/selectors';

type FooterElements = {
  [key: string]: { label: string; path: string }[];
};
const Footer = () => {
  const themeState = useAppSelector(selectThemeStatus);
  const footerKeys = Object.keys(footerElements);
  const typedFooterElements: FooterElements = footerElements;

  return (
    <div
      className={classNames({
        footer: true,
        'footer-secondary': themeState,
      })}
    >
      <div className="footer-bottom-content">
        <div className="footer-nav-list">
          {footerKeys.map((key: string) => (
            <NavList header={key} items={typedFooterElements[key]} />
          ))}
        </div>
        <div className="footer-bottom-content__socials">
          <div className="footer-bm-logo" />
          <div className="footer-socials">
            <div className="footer-socials-instagram" />
            <div className="footer-socials-facebook" />
            <div className="footer-socials-twitter" />
            <div className="footer-socials-linkedin" />
          </div>
        </div>
      </div>
      <div className="footer-subscription">
        <p className="footer-subscription__header">Suscribe to our weekly newsletter!</p>
        <div>
          <p className="footer-subscription__email">Email</p>
          <input placeholder="Type your email" className="footer-subscription__input" />
        </div>
        <button
          className={classNames({
            'footer-subscription__submit': true,
            'footer-subscription__submit-secondary': themeState,
          })}
          type="button"
        >
          Subscribe
        </button>
        <p>By subscribing you agree to receive weekly emails with our latest news and updates</p>
      </div>
    </div>
  );
};

export default Footer;
