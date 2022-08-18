import '../styles/containers/basicForm.scss';

type Props = {
  children: React.ReactChild;
  showLogo?: boolean;
};
const BasicForm = ({ children, showLogo = false }: Props) => (
  <div className="basic-form">
    {showLogo && <div role="img" className="basic-form__logo" />}
    {children}
  </div>
);
export default BasicForm;
