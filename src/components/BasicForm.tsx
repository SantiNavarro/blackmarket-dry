import '../styles/containers/basicForm.scss';
import Logo from '../assets/blackMarketLogo.png';

type Props = {
  children: React.ReactChild;
  showLogo?: boolean;
};
const BasicForm = ({ children, showLogo = false }: Props) => (
  <div className="basic-form">
    {showLogo && <img src={Logo} className="basic-form__logo" alt="basic-form__logo" />}
    {children}
  </div>
);
export default BasicForm;
