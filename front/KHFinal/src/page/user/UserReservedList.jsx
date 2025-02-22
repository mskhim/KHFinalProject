import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useMemo } from 'react';

const UserReservedList = () => {
  const header = useMemo(() => <Header />, []);
  const footer = useMemo(() => <Footer />, []);

  return (
    <>
      {header}
      <h1>UserReservedList</h1>
      {footer}
    </>
  );
};

export default UserReservedList;
