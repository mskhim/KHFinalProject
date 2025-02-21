import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Main = () => {
  const sectionRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ 페이지 로드 후 최상단 고정

    setTimeout(() => {
      console.log('📌 sectionRefs:', sectionRefs.current);
      console.log('📌 arrowRefs:', arrowRefs.current);

      const ctx = gsap.context(() => {
        // 🔹 각 섹션 페이드인 애니메이션 적용
        sectionRefs.current.forEach((section) => {
          if (!section) return;
          gsap.fromTo(
            section,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%', // ✅ 트리거가 더 빨리 작동하도록 조정
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 🔹 화살표 감지 & 자동 스크롤
        arrowRefs.current.forEach((arrow, index) => {
          if (!arrow) {
            console.warn(`❌ arrowRefs[${index}]가 존재하지 않음`);
            return;
          }

          console.log(`🟢 ScrollTrigger 생성됨: arrowRefs[${index}]`, arrow);

          ScrollTrigger.create({
            trigger: arrow,
            start: 'top 50%', // ✅ scroller-start와 start가 만나면 실행
            onEnter: () => {
              const nextSection = sectionRefs.current[index + 1];

              if (!nextSection) {
                console.warn(`❌ 다음 섹션이 존재하지 않음 (index: ${index})`);
                return; // ✅ 마지막 섹션 이후에는 실행되지 않도록 방지
              }

              console.log(
                `➡️ 자동 스크롤 실행! index: ${index}, 다음 섹션:`,
                nextSection
              );

              // ✅ 다음 섹션이 보이도록 애니메이션 먼저 적용 후 스크롤
              gsap.to(nextSection, {
                opacity: 1,
                ease: 'power2.out',
                onComplete: () => {
                  gsap.to(window, {
                    duration: 1.5, // ✅ 부드러운 스크롤 이동
                    scrollTo: { y: nextSection, autoKill: true },
                    ease: 'power2.inOut',
                  });
                },
              });
            },
            toggleActions: 'play none none none',
            once: false, // ✅ 여러 번 실행 가능
          });
        });

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 500); // ✅ 0.5초 지연 후 실행 (렌더링 완료 후)
  }, []);

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

        {/* ✅ 첫 번째 섹션 */}
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="fade-in-section section"
        >
          <Top4 />
        </div>

        {/* ✅ 두 번째 화살표 */}
        <div
          ref={(el) => (arrowRefs.current[1] = el)}
          className="arrow-container"
        >
          <ScrollDownArrow />
        </div>

        {/* ✅ 두 번째 섹션 */}
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="fade-in-section section"
        >
          <Announcement />
          <SubCarousel />
          <ByRegionFestival />
        </div>

        {/* ✅ 세 번째 화살표 */}
        <div
          ref={(el) => (arrowRefs.current[2] = el)}
          className="arrow-container"
        >
          <ScrollDownArrow />
        </div>

        {/* ✅ 마지막 섹션 */}
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="fade-in-section section"
        >
          <StartFestival />
          <EndFestival />
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Main;
