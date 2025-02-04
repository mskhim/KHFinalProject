import { useState, useContext } from 'react';
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
import './EventRead.css'; // CSS 파일 추가

const EventRead = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const { getDarkMode, getDarkModeHover } = useContext(Context); // 다크모드 적용

  // ✅ 랜덤 이미지 URL 생성 (목업 데이터)
  const mainImage = 'https://picsum.photos/600/400?random=10'; // 메인 이미지
  const subImages = [
    'https://picsum.photos/100/100?random=1',
    'https://picsum.photos/100/100?random=2',
    'https://picsum.photos/100/100?random=3',
    'https://picsum.photos/100/100?random=4',
    'https://picsum.photos/100/100?random=5',
  ]; // 서브 이미지 5개

  const handleIncrease = () => setTicketCount(ticketCount + 1);
  const handleDecrease = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  return (
    <>
      <Header />
      <Container className={`py-5 EventReadTitle-container ${getDarkMode()}`}>
        <Row className="align-items-center">
          {/* 📌 좌측: 메인 이미지 + 서브 이미지 */}
          <Col md={6} className="position-relative">
            <Card className="border-0">
              <Card.Img
                src={mainImage}
                alt="Main Event"
                className="img-fluid rounded EventReadTitle-main-image"
              />
            </Card>
            {/* ㄴ자 형태의 서브 이미지 */}
            <div className="position-absolute EventReadTitle-sub-images">
              {subImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Sub ${index + 1}`}
                  className={`EventReadTitle-sub-image sub${index}`}
                />
              ))}
            </div>
          </Col>

          {/* 📌 우측: 축제 정보 + 예매 */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="EventReadTitle-title">🎉 랜덤 축제 이벤트</h2>
            <p className="EventReadTitle-price">
              💰 티켓 가격: <strong>20,000원</strong>
            </p>

            {/* 🎟 티켓 수량 선택 */}
            <ButtonGroup className="mb-3">
              <Button
                className={`btn-outline-secondary ${getDarkModeHover()} EventReadTitle-ticket-btn`}
                onClick={handleDecrease}
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

            {/* 🛒 장바구니 버튼 */}
            <Button
              className={`btn-primary w-100 ${getDarkModeHover()} EventReadTitle-cart-btn`}
            >
              🛒 장바구니 담기
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EventRead;
