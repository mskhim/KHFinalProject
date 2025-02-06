import { useState, useContext, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Context } from '../../Context'; // 다크모드 컨텍스트 적용
import './css/EventRead.css'; // CSS 파일 추가
import { useParams } from 'react-router-dom';
import { use } from 'react';
import ReviewSection from './include/ReivewSection';
import MapSection from './include/MapSection';

const EventRead = () => {
  let events = [
    {
      NO: 1,
      NAME: '서울 불꽃축제',
      PLACE: '여의도 한강공원',
      START_DATE: '2025-10-05',
      END_DATE: '2025-10-06',
      CONTENT: '매년 열리는 서울의 대표적인 불꽃놀이 축제',
      GOVERNING: '서울시',
      HOST: '한화그룹',
      TEL: '02-1234-5678',
      HOMEPAGE: 'https://www.fireworksfestival.com',
      ADRESS: '서울특별시 영등포구 여의도동 84-3',
      LATITUDE: 37.523456,
      LONGITUDE: 126.923789,
    },
    {
      NO: 2,
      NAME: '부산 국제 영화제',
      PLACE: '부산 영화의전당',
      START_DATE: '2025-09-30',
      END_DATE: '2025-10-10',
      CONTENT: '아시아 최대 규모의 국제 영화제',
      GOVERNING: '부산광역시',
      HOST: 'BIFF 조직위원회',
      TEL: '051-9876-5432',
      HOMEPAGE: 'https://www.biff.kr',
      ADRESS: '부산광역시 해운대구 수영강변대로 120',
      LATITUDE: 35.171165,
      LONGITUDE: 129.127188,
    },
    {
      NO: 3,
      NAME: '진주 남강 유등축제',
      PLACE: '진주 남강 일대',
      START_DATE: '2025-10-01',
      END_DATE: '2025-10-14',
      CONTENT: '남강을 수놓는 아름다운 유등과 빛의 향연',
      GOVERNING: '진주시',
      HOST: '진주시청',
      TEL: '055-7654-3210',
      HOMEPAGE: 'https://www.jjlantern.or.kr',
      ADRESS: '경상남도 진주시 강남동 1-1',
      LATITUDE: 35.192834,
      LONGITUDE: 128.084728,
    },
    {
      NO: 4,
      NAME: '화천 산천어 축제',
      PLACE: '강원도 화천군 화천천',
      START_DATE: '2026-01-07',
      END_DATE: '2026-01-22',
      CONTENT: '겨울에 즐기는 얼음낚시와 다양한 겨울 체험',
      GOVERNING: '강원도 화천군청',
      HOST: '화천군 관광협회',
      TEL: '033-123-4567',
      HOMEPAGE: 'https://www.narafestival.com',
      ADRESS: '강원도 화천군 화천읍 대이리 12-1',
      LATITUDE: 38.106437,
      LONGITUDE: 127.706932,
    },
    {
      NO: 5,
      NAME: '담양 대나무 축제',
      PLACE: '전남 담양 죽녹원',
      START_DATE: '2025-05-01',
      END_DATE: '2025-05-05',
      CONTENT: '대나무의 고장 담양에서 펼쳐지는 자연 친화 축제',
      GOVERNING: '전라남도 담양군청',
      HOST: '담양군 관광협회',
      TEL: '061-432-1098',
      HOMEPAGE: 'https://www.bamboo.or.kr',
      ADRESS: '전라남도 담양군 담양읍 죽녹원로 119',
      LATITUDE: 35.321098,
      LONGITUDE: 126.987654,
    },
  ];
  const param = useParams();
  const [eventInfo, setEventInfo] = useState({});
  const [ticketCount, setTicketCount] = useState(1);
  const { getDarkMode, getDarkModeHover } = useContext(Context); // 다크모드 적용
  useEffect(() => {
    setEventInfo(events.find((event) => event.NO === Number(param.no)));
  }, [param.no]);

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -120, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 120, behavior: 'smooth' });
    }
  };
  // ✅ 랜덤 이미지 URL 생성 (목업 데이터)
  const initialMainImage = 'https://picsum.photos/600/400?random=10'; // 초기 메인 이미지
  const subImages = [
    'https://picsum.photos/600/400?random=1',
    'https://picsum.photos/600/400?random=2',
    'https://picsum.photos/600/400?random=3',
    'https://picsum.photos/600/400?random=4',
    'https://picsum.photos/600/400?random=5',
    'https://picsum.photos/600/400?random=6',
    'https://picsum.photos/600/400?random=7',
  ]; // 서브 이미지 5개 (메인과 동일 비율 유지)

  const [mainImage, setMainImage] = useState(initialMainImage); // ✅ 현재 메인 이미지 상태

  const handleIncrease = () => setTicketCount(ticketCount + 1);
  const handleDecrease = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  return (
    <>
      <Header />
      <Container className={`EventReadTitle-container ${getDarkMode()}`}>
        <Row className="align-items-center">
          {/* 📌 좌측: 메인 이미지 + 서브 이미지 */}
          <Col md={8} className="position-relative">
            <Card className="border-0 align-items-center mb-2">
              <Card.Img
                src={mainImage}
                alt="Main Event"
                className="img-fluid rounded EventReadTitle-main-image fade-in"
              />
            </Card>

            {/* ✅ 서브 이미지: 좌우 버튼으로 이동 */}
            <div className="position-relative d-flex align-items-center">
              {/* 좌측 버튼 */}
              <Button
                variant="none"
                className={`position-absolute start-0 z-3 ${getDarkModeHover()} border`}
                style={{ opacity: 0.9 }}
                onClick={scrollLeft}
              >
                ◀
              </Button>

              <div
                ref={scrollRef}
                className="d-flex w-100 mt-2 overflow-hidden"
                style={{
                  whiteSpace: 'nowrap',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                }}
              >
                {subImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Sub ${index + 1}`}
                    className="mx-1"
                    style={{
                      width: '100px',
                      height: 'auto',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: '0.3s ease-in-out',
                      boxShadow:
                        mainImage === img
                          ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
                          : 'none',
                      opacity: mainImage === img ? '0.6' : '1',
                      border: mainImage === img ? '3px solid #007bff' : 'none',
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>

              {/* 우측 버튼 */}
              <Button
                variant="light"
                className="position-absolute end-0 z-3"
                style={{ opacity: 0.7 }}
                onClick={scrollRight}
              >
                ▶
              </Button>
            </div>
          </Col>

          {/* 📌 우측: 축제 정보 + 예매 */}
          <Col md={4} className="d-flex flex-column justify-content-center p-4">
            <h2 className="EventReadTitle-title">{eventInfo.NAME}</h2>
            <p className="EventReadTitle-location">
              <strong>장소:</strong> {eventInfo.PLACE}
            </p>
            <p className="EventReadTitle-dates">
              <strong>일정:</strong> {eventInfo.START_DATE} ~{' '}
              {eventInfo.END_DATE}
            </p>
            <p className="EventReadTitle-content">{eventInfo.CONTENT}</p>
            <hr />
            <p className="EventReadTitle-host">
              <strong>주최:</strong> {eventInfo.HOST} / <strong>주관:</strong>{' '}
              {eventInfo.GOVERNING}
            </p>
            <p className="EventReadTitle-contact">
              <strong>문의:</strong>{' '}
              <a href={`tel:${eventInfo.TEL}`}>{eventInfo.TEL}</a>
            </p>
            <p className="EventReadTitle-homepage">
              <strong>공식 홈페이지:</strong>{' '}
              <a
                href={eventInfo.HOMEPAGE}
                target="_blank"
                rel="noopener noreferrer"
              >
                {eventInfo.HOMEPAGE}
              </a>
            </p>

            {/* 🎟 티켓 수량 선택 */}
            <div className={`border p-3 rounded mb-3 ${getDarkMode()} div`}>
              <p className={`mb-2 ${getDarkMode()} span`}>
                가격: <strong>20,000원</strong>
              </p>
              <ButtonGroup className="mb-3">
                <Button
                  className={`btn-outline-secondary ${getDarkModeHover()} EventReadTitle-ticket-btn`}
                  onClick={handleDecrease}
                  variant="none"
                >
                  -
                </Button>
                <span className="fs-4 px-3 EventReadTitle-ticket-count">
                  {ticketCount}
                </span>
                <Button
                  className={`btn-outline-secondary ${getDarkModeHover()} EventReadTitle-ticket-btn`}
                  onClick={handleIncrease}
                >
                  +
                </Button>
              </ButtonGroup>
              <h5 className="mb-2">
                합계:{' '}
                <strong>{(ticketCount * 20000).toLocaleString()}원</strong>
              </h5>
              <Button
                className={`btn-primary w-100 ${getDarkModeHover()} EventReadTitle-cart-btn`}
              >
                🛒 장바구니 담기
              </Button>
            </div>
          </Col>
        </Row>
        {/* 리뷰 창과 맵 */}
        <Row>
          <Col md={8}>
            <ReviewSection />
          </Col>
          <Col md={4}>
            <MapSection
              LATITUDE={eventInfo.LATITUDE}
              LONGITUDE={eventInfo.LONGITUDE}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EventRead;
