import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Main.css';
import MainCarousel from './components/MainCarousel';
import Top4 from './components/Top4';
import Announcement from './components/Announcement';
import StartFestival from './components/StartFestival';
import EndFestival from './components/EndFestival';
import { Container } from 'react-bootstrap';
import RandomFestival from './components/RandomFestival';

const Main = () => {
  return (
    <>
      <Header />
      <MainCarousel />
      <Container fluid>
        <Announcement />
        <Top4 />
        <StartFestival />
        <EndFestival />
        <RandomFestival />
      </Container>
      <Footer />
    </>
  );
};

export default Main;
