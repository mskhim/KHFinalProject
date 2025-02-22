import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
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
import { Container } from 'react-bootstrap';
import ScrollDownArrow from './components/ScrollDownArrow';
import ScrollUpArrow from './components/ScrollUpArrow';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Main = () => {
  const sectionRefs = useRef([]);
  const arrowRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInBottomSection, setIsInBottomSection] = useState(false);
  const scrollTimeout = useRef(null);

  // 페이지 로드 후 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 페이드인 애니메이션 추가
  useLayoutEffect(() => {
    if (sectionRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // 자동 스크롤 이벤트 추가 (하단부 자유 스크롤 허용 + 위로 이동 감지 개선)
  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling) return;

      const bottomSection = sectionRefs.current[1];
      if (!bottomSection) return;

      const sectionTop = bottomSection.offsetTop;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = bottomSection.offsetHeight;

      if (
        scrollPosition >= sectionTop - 10 &&
        scrollPosition < sectionTop + sectionHeight - windowHeight
      ) {
        setIsInBottomSection(true);
      } else {
        setIsInBottomSection(false);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        // 메인에서 아래로 스크롤하면 하단부 이동
        if (!isInBottomSection && event.deltaY > 50) {
          setIsScrolling(true);
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: sectionTop },
            ease: 'power2.inOut',
            onComplete: () => setIsScrolling(false),
          });
        }
      }, 300); // ✅ 0.3초 대기 후 자동 스크롤 실행
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isScrolling, isInBottomSection]);

  // 위로 이동 감지 (스크롤 업 감지 정확하게 적용)
  useEffect(() => {
    const handleUpScroll = (event) => {
      if (isScrolling || !isInBottomSection) return;

      const scrollPosition = window.scrollY;
      const sectionTop = sectionRefs.current[1]?.offsetTop || 0;

      if (scrollPosition <= sectionTop + 50 && event.deltaY < -50) {
        setIsScrolling(true);
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: 0 },
          ease: 'power2.inOut',
          onComplete: () => {
            setIsScrolling(false);
            setIsInBottomSection(false);
          },
        });
      }
    };

    window.addEventListener('wheel', handleUpScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleUpScroll);
    };
  }, [isScrolling, isInBottomSection]);

  return (
    <>
      <Header />
      <div
        className="main-carousel-wrapper"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <Container fluid>
          <MainCarousel className="main-carousel" />
        </Container>
      </div>

      <Container className="container-sm">
        <div
          ref={(el) => (arrowRefs.current[0] = el)}
          className="arrow-container"
        >
          <ScrollDownArrow />
        </div>

        <div className="spacer"></div>

        <div
          ref={(el) => (arrowRefs.current[1] = el)}
          className="arrow-container"
        >
          <ScrollUpArrow />
        </div>

        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="section fade-in-section"
        >
          <Announcement />
          <Top4 />
          <ByRegionFestival />
          <hr />
          <StartFestival />
          <EndFestival />
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Main;
