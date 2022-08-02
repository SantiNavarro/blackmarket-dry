import Layout from '../components/Layout';
import ProductsListing from '../components/ProductsListing';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';

const Home = () => {
  return (
    <Layout>
      <p className="paragraph-secondary">Home</p>
      <ProductsListing />
    </Layout>
  );
};

export default Home;
