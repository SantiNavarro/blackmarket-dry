import AdContent from '../components/AdContent';
import Layout from '../components/Layout';
import ProductsListing from '../components/ProductsListing';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';
import Ad1 from '../assets/ad1.png';
import Ad2 from '../assets/ad2.png';
import Ad3 from '../assets/ad3.png';
import Ad4 from '../assets/ad4.png';
import CryptoLogo from '../assets/crypto.svg';
import CardLogo from '../assets/card.svg';
import PayPalLogo from '../assets/paypal.svg';
import PaymentMethods from '../components/PaymentMethods';

const Home = () => {
  return (
    <Layout>
      <ProductsListing />
      <AdContent firstImage={Ad1} secondImage={Ad2} />
      <PaymentMethods firstImage={CardLogo} secondImage={PayPalLogo} thirdImage={CryptoLogo} />
      <AdContent firstImage={Ad3} secondImage={Ad4} />
    </Layout>
  );
};

export default Home;
