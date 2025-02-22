import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
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
gsap.registerPlugin(ScrollToPlugin);

const Main = () => {
  const sectionRefs = useRef([]);
  const arrowRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ 페이지 로드 후 최상단 이동
    sectionRefs.current = sectionRefs.current.filter(Boolean);
    arrowRefs.current = arrowRefs.current.filter(Boolean);
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling) {
        event.preventDefault(); // ✅ 스크롤 중 추가 입력 방지
        return;
      }

      // ✅ 현재 보고 있는 화살표 찾기 (감지 위치 조정)
      let activeArrowIndex = arrowRefs.current.findLastIndex(
        (arrow) => arrow && window.scrollY + 1000 >= arrow.offsetTop // ✅ 감지 영역을 아래로 조정
      );

      activeArrowIndex = Math.max(activeArrowIndex, 0); // ✅ 최소 index 보장

      if (activeArrowIndex === -1) {
        console.warn(`❌ 현재 보이는 화살표를 찾을 수 없음`);
        return;
      }

      // ✅ 이동할 섹션 찾기
      const targetSection = sectionRefs.current[activeArrowIndex];

      if (!targetSection) {
        console.warn(
          `❌ 이동할 섹션이 존재하지 않음 (index: ${activeArrowIndex})`
        );
        return;
      }

      console.log(
        `➡️ 자동 스크롤 실행! 화살표 index: ${activeArrowIndex}, 이동할 섹션:`,
        targetSection
      );

      setIsScrolling(true);
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetSection.offsetTop - 100 }, // ✅ 이동 위치 최적화
        ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => {
            setIsScrolling(false);
            window.dispatchEvent(new Event('scroll')); // ✅ 강제 scroll 이벤트 발생
          }, 500);
        },
      });
    };

    // ✅ 이벤트 리스너 추가
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isScrolling]);
  return (
    <>
      <Header />
      <div className="main-carousel-wrapper">
        <MainCarousel className="main-carousel" />
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
        <div ref={(el) => (sectionRefs.current[0] = el)} className="section">
          <Announcement />
          <Top4 />
        </div>

        <div
          ref={(el) => (arrowRefs.current[1] = el)}
          className="arrow-container"
        >
          <ScrollDownArrow />
        </div>
        <div className="spacer"></div>

        <div ref={(el) => (sectionRefs.current[1] = el)} className="section">
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
