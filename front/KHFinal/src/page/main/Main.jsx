import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Main.css';
import MainCarousel from './components/MainCarousel';
import Top4 from './components/Top4';
import Announcement from './components/Announcement';
import ByRegionFestival from './components/ByRegionFestival';
import StartFestival from './components/StartFestival';
import EndFestival from './components/EndFestival';
import { Container } from 'react-bootstrap';
import './Main.css';
const Main = () => {
  return (
    <>
      <Header />
      <Container className="Main-container">
        <MainCarousel />
        <Announcement />
        <Top4 />
        <ByRegionFestival />
        <StartFestival />
        <EndFestival />
      </Container>
      <Footer />
    </>
  );
};

export default Main;
