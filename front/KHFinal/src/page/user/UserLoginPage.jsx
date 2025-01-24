import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";

import NaverLogin from "./components/NaverLogin";
const UserLoginPage = () => {
  return (
    <>
      <Header />
      <h1>UserLoginPage</h1>
      <NaverLogin />
      <Footer />
    </>
  );
};

export default UserLoginPage;
