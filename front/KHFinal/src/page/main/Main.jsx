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

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Main = () => {
  const sectionRefs = useRef([]);
  const arrowRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // ✅ 한 번만 실행되도록 제어

  // ✅ 페이지 로드 후 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ 페이드인 애니메이션 추가
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
              start: 'top 85%', // ✅ 페이드인 실행 위치
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh(); // ✅ 강제 업데이트
    });

    return () => ctx.revert(); // ✅ 컴포넌트 언마운트 시 클린업
  }, []);

  // ✅ 자동 스크롤 기능 (한 번 실행 후 비활성화)
  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling || hasScrolled) {
        event.preventDefault();
        return;
      }

      // ✅ 현재 보고 있는 화살표 찾기
      let activeArrowIndex = arrowRefs.current.findLastIndex(
        (arrow) =>
          arrow && window.scrollY + window.innerHeight * 0.5 >= arrow.offsetTop
      );

      activeArrowIndex = Math.max(activeArrowIndex, 0);

      if (activeArrowIndex === -1) {
        console.warn(`❌ 현재 보이는 화살표를 찾을 수 없음`);
        return;
      }

      // ✅ 이동할 섹션 찾기
      const targetSection = sectionRefs.current[activeArrowIndex];

      if (!targetSection) {
        console.warn(`❌ 이동할 섹션이 존재하지 않음`);
        return;
      }

      console.log(
        `➡️ 자동 스크롤 실행! 화살표 index: ${activeArrowIndex}, 이동할 섹션:`,
        targetSection
      );

      setIsScrolling(true);
      gsap.to(window, {
        duration: 1.2,
        delay: 0.5,
        scrollTo: { y: targetSection.offsetTop - 100 },
        ease: 'power2.inOut',
        onComplete: () => {
          setIsScrolling(false);
          setHasScrolled(true); // ✅ 자동 스크롤 한 번 실행 후 비활성화
        },
      });
    };

    if (!hasScrolled) {
      window.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('touchmove', handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isScrolling, hasScrolled]);

  return (
    <>
      <Header />
      <div className="main-carousel-wrapper">
        <Container fluid>
          <div className="main-carousel-wrapper">
            <MainCarousel className="main-carousel" />
          </div>
        </Container>
      </div>

      <Container className="container-sm">
        {/* ✅ 첫 번째 화살표 */}
        <div
          ref={(el) => (arrowRefs.current[0] = el)}
          className="arrow-container"
        >
          <ScrollDownArrow />
        </div>
        <div className="spacer"></div>

        {/* ✅ 개별 섹션 */}
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
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
