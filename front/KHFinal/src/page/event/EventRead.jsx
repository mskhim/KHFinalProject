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
import { useNavigate, useParams } from 'react-router-dom';
import ReviewSection from './include/ReivewSection';
import MapSection from './include/MapSection';
import { ButtonDarkMode, ButtonRoleAndUserNo } from '../../components/ui';
import { deleteEvent, insertEventToCart, selectEventRead } from './eventApi';
import CartModalPage from './include/CartModalPage';

const EventRead = () => {
  const param = useParams();
  const nav = useNavigate();
  const [eventInfo, setEventInfo] = useState({});
  const [cart, setCart] = useState({ qt: 1 });
  const [ticketCount, setTicketCount] = useState(1);
  const { getDarkMode, getDarkModeHover } = useContext(Context); // 다크모드 적용
  const [mainImage, setMainImage] = useState(''); // ✅ 현재 메인 이미지 상태
  const [subImages, setSubImages] = useState([]); // ✅ 서브 이미지 상태
  useEffect(() => {
    const eventData = async () => {
      const response = await selectEventRead(param.no);
      setEventInfo(response.eventSelectRead);
      setMainImage(response.eventSelectRead.thumburl);
      setSubImages(response.url);
    };
    eventData();
  }, [param.no]);
  // 장바구니 담기
  useEffect(() => {
    setCart({ eventNo: eventInfo.no, qt: ticketCount });
  }, [ticketCount, eventInfo.no]);

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

  const handleIncrease = () => setTicketCount(ticketCount + 1);
  const handleDecrease = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };
  const handleDelete = async () => {
    const response = await deleteEvent(eventInfo.userAccountNo, eventInfo.no);
    if (response) {
      nav('/eventList');
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleCart = async () => {
    // 장바구니 담기 API 호출

    const response = await insertEventToCart(cart);
    // 모달 표시
    if (response) {
      setShowModal(true);
    }
  };
  return (
    <>
      <Header page="list" />
      <Container className={`EventReadTitle-container ${getDarkMode()}`}>
        <Row className="align-items-center">
          {/* 📌 좌측: 메인 이미지 + 서브 이미지 */}
          <Col md={8} className="position-relative">
            <Card className="border-0 align-items-center mb-2 h-100">
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
                <img
                  src={eventInfo.thumburl}
                  alt={`Sub 1`}
                  className="mx-1"
                  style={{
                    width: '100px',
                    height: 'auto',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: '0.3s ease-in-out',
                    boxShadow:
                      mainImage === eventInfo.thumburl
                        ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
                        : 'none',
                    opacity: mainImage === eventInfo.thumburl ? '0.6' : '1',
                  }}
                  onClick={() => setMainImage(eventInfo.thumburl)}
                />
                {subImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Sub ${index + 2}`}
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
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>

              {/* 우측 버튼 */}
              <Button
                variant="none"
                className={`position-absolute end-0 z-3 ${getDarkModeHover()} border button`}
                style={{ opacity: 0.7 }}
                onClick={scrollRight}
              >
                ▶
              </Button>
            </div>
          </Col>

          {/* 📌 우측: 축제 정보 + 예매 */}
          <Col md={4} className="d-flex flex-column justify-content-center p-4">
            {' '}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="EventReadTitle-title me-5 text-nowrap">
                {eventInfo.name}
              </h2>
              <ButtonRoleAndUserNo
                text="삭제"
                userNo={eventInfo.userAccountNo}
                role="manager"
                onClick={() => handleDelete()}
              />
            </div>
            <p className="EventReadTitle-location">
              <strong>장소:</strong> {eventInfo.place}
            </p>
            <p className="EventReadTitle-dates">
              <strong>일정:</strong> {eventInfo.startDate} ~{eventInfo.endDate}
              {eventInfo.END_DATE}
            </p>
            <p className="EventReadTitle-content">{eventInfo.content}</p>
            <hr />
            <p className="EventReadTitle-host">
              <strong>주최:</strong> {eventInfo.host} / <strong>주관:</strong>{' '}
              {eventInfo.governing}
            </p>
            <p className="EventReadTitle-contact">
              <strong>문의:</strong>{' '}
              <a href={`tel:${eventInfo.tel}`}>{eventInfo.tel}</a>
            </p>
            <p className="EventReadTitle-homepage">
              <strong>공식 홈페이지:</strong>{' '}
              <a
                href={eventInfo.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {eventInfo.HOMEPAGE}
              </a>
            </p>
            {/* 🎟 티켓 수량 선택 */}
            <div className={`border p-3 rounded mb-3 ${getDarkMode()} div`}>
              <p className={`mb-2 ${getDarkMode()} span`}>
                가격 : <strong>{eventInfo.price}원</strong>
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
                합계 :{' '}
                <strong>
                  {(ticketCount * eventInfo.price).toLocaleString()}원
                </strong>
              </h5>
              <Button
                className={`btn-primary w-100 ${getDarkModeHover()} EventReadTitle-cart-btn`}
                onClick={handleCart}
              >
                🛒 장바구니 담기
              </Button>
            </div>
          </Col>
        </Row>
        {/* 리뷰 창과 맵 */}
        <Row>
          <Col md={8}>
            <ReviewSection rating={eventInfo.rating} eventNo={eventInfo.no} />
          </Col>
          <Col md={4}>
            <MapSection
              LATITUDE={eventInfo.latitude}
              LONGITUDE={eventInfo.longitude}
            />
          </Col>
        </Row>
      </Container>
      <CartModalPage showModal={showModal} setShowModal={setShowModal} />
      <Footer />
    </>
  );
};

export default EventRead;
