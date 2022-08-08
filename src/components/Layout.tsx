import { ReactChild } from 'react';
import '../styles/containers/layout.scss';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: ReactChild | ReactChild[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
