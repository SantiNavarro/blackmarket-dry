import { ReactChild } from 'react';
import '../styles/containers/layout.scss';
import Header from './Header';

type Props = {
  children: ReactChild | ReactChild[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
