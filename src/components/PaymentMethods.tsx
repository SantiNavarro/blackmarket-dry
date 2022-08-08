import '../styles/containers/paymentMethods.scss';

interface PaymentMethodsProps {
  firstImage: any;
  secondImage?: any;
  thirdImage?: any;
}
const PaymentMethods = ({ firstImage, secondImage, thirdImage }: PaymentMethodsProps) => (
  <div className="payment-methods-container">
    <h1>Payment methods</h1>
    <div className="payment-methods">
      <div className="payment-methods__logo">
        <img className="payment-methods__images" src={firstImage} alt="first-add" />
        <p>Credit</p>
        <div className="payment-methods-border" />
      </div>
      <div className="payment-methods__logo">
        {secondImage && (
          <img className="payment-methods__images" src={secondImage} alt="first-add" />
        )}
        <p>PayPal</p>
        <div className="payment-methods-border" />
      </div>
      <div className="payment-methods__logo">
        {thirdImage && <img className="payment-methods__images" src={thirdImage} alt="first-add" />}
        <p>Crypto</p>
      </div>
    </div>
  </div>
);

export default PaymentMethods;
