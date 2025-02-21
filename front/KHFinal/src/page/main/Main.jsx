import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Main.css';
import MainCarousel from './components/MainCarousel';
import Top4 from './components/Top4';
import Announcement from './components/Announcement';
import ByRegionFestival from './components/ByRegionFestival';
import StartFestival from './components/StartFestival';
import EndFestival from './components/EndFestival';
import SubCarousel from './components/SubCarousel';
import { Container } from 'react-bootstrap';
import ScrollDownArrow from './components/ScrollDownArrow';

const Main = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Header />
      <MainCarousel />
      <ScrollDownArrow />
      <Container className="container-sm">
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className="fade-in-section"
        >
          <Top4 />
        </div>
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="fade-in-section"
        >
          <Announcement />
        </div>
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="fade-in-section"
        >
          <ByRegionFestival />
        </div>
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="fade-in-section"
        >
          <SubCarousel />
        </div>
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className="fade-in-section"
        >
          <StartFestival />
        </div>
        <div
          ref={(el) => (sectionRefs.current[5] = el)}
          className="fade-in-section"
        >
          <EndFestival />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Main;
