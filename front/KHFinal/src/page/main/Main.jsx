import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const sectionRefs = useRef([]);
  const arrowRef = useRef(null);

  useEffect(() => {
    // ✅ GSAP의 context() 사용하여 React 환경에서도 안전하게 실행
    const ctx = gsap.context(() => {
      // 🔹 페이지 로드 시 최상단으로 이동
      window.scrollTo(0, 0);

      // 🔹 화살표가 보이는 애니메이션
      gsap.to(arrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.main-carousel',
          start: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 🔹 각 섹션에 페이드인 애니메이션 적용
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 🔹 스크롤하면 자동으로 다음 섹션으로 이동
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => {
            window.scrollTo({
              top: section.offsetTop,
              behavior: 'smooth',
            });
          },
        });
      });
    });

    return () => ctx.revert(); // 🚀 GSAP 컨텍스트 정리 (React에서 필요)
  }, []);

  return (
    <>
      <Header />
      <MainCarousel className="main-carousel" />
      <div ref={arrowRef}>
        <ScrollDownArrow />
      </div>
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
