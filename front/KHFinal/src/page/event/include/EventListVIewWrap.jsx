import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Spinner,
  Badge, // ✅ 스피너 추가
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonRole } from '../../../components/ui';
import './css/EventListViewWrap.css';
import { Context } from '../../../Context';
import { selectEventList } from '../eventApi';
import { BsCheckCircle, BsClock, BsXCircle } from 'react-icons/bs';

const EventListViewWrap = ({
  sortOption,
  setSortOption,
  eventList,
  setEventList,
}) => {
  const navigate = useNavigate();
  const { getDarkModeHover } = useContext(Context);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // ✅ 로딩 상태 추가
  const observerRef = useRef(null);

  // ✅ 새로운 이벤트 리스트 불러오기
  const fetchEvents = useCallback(
    async (data) => {
      if (!hasMore || isLoading) return; // ✅ 이미 로딩 중이면 중복 실행 방지
      setIsLoading(true); // ✅ 로딩 시작

      try {
        const dataList = await selectEventList(data);

        if (dataList.length === 0 && data.page > 1) {
          setHasMore(false);
        } else {
          setEventList((prevList) => [...prevList, ...dataList]);
        }

        if (dataList.length < 9 && data.page > 1) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('❌ 이벤트 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false); // ✅ 로딩 종료
      }
    },
    [sortOption.page, isLoading]
  );

  // ✅ page가 변경될 때만 fetchEvents 실행
  useEffect(() => {
    fetchEvents(sortOption);
  }, [sortOption.toggle]);

  // ✅ 검색 조건이 변경될 때 리스트 초기화
  useEffect(() => {
    setEventList([]); // ✅ 기존 데이터 초기화
    setHasMore(true);
  }, [sortOption.sort, sortOption.search, sortOption.date, sortOption.region]);

  // ✅ Intersection Observer를 이용한 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          eventList.length >= 9 &&
          !isLoading
        ) {
          setTimeout(() => {
            setSortOption((prev) => ({
              ...prev,
              page: prev.page + 1,
              toggle: !prev.toggle,
            }));
          }, 500);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, eventList.length, isLoading]); // ✅ isLoading 추가

  // ✅ 정렬 옵션 변경
  const handleSortChange = (option) => {
    setSortOption((prev) => ({
      ...prev,
      sort: option,
      page: 1,
      toggle: !prev.toggle,
    }));
    setEventList([]); // 기존 데이터 초기화
    setHasMore(true); // 데이터 다시 불러오기 가능하게 설정
  };

  return (
    <Container className="EventListViewWrap-container py-4 px-4">
      {/* ✅ 정렬 버튼 (상단 오른쪽) */}
      <div className="d-flex justify-content-end mb-3">
        <ButtonGroup>
          <Button
            className={`EventListVIewWrap-sort-button ${getDarkModeHover()} ButtonGroup ${
              sortOption.sort === 'startDate' ? 'active' : ''
            } `}
            onClick={() => handleSortChange('startDate')}
            variant="none"
          >
            개최일순
          </Button>
          <Button
            className={`EventListVIewWrap-sort-button ${getDarkModeHover()} ButtonGroup ${
              sortOption.sort === 'rating' ? 'active' : ''
            } `}
            onClick={() => handleSortChange('rating')}
            variant="none"
          >
            인기순
          </Button>
          <Button
            className={`EventListVIewWrap-sort-button ${getDarkModeHover()} ButtonGroup ${
              sortOption.sort === 'subDate' ? 'active' : ''
            } `}
            onClick={() => handleSortChange('subDate')}
            variant="none"
          >
            등록일순
          </Button>
        </ButtonGroup>
      </div>
      <br />

      {/* ✅ 로딩 중이면 스피너 표시 */}
      {isLoading && eventList.length === 0 && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* ✅ 이벤트 카드 목록 */}
      <Row className="g-4">
        {eventList.map((event) => {
          const today = new Date();
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);

          let eventStatus = '진행 예정';
          let badgeVariant = 'badge-upcoming';
          let Icon = BsClock; // 기본 아이콘 (진행 예정)

          if (today >= startDate && today <= endDate) {
            eventStatus = '진행 중';
            badgeVariant = 'badge-ongoing';
            Icon = BsCheckCircle;
          } else if (today > endDate) {
            eventStatus = '종료됨';
            badgeVariant = 'badge-ended';
            Icon = BsXCircle;
          }

          return (
            <Col
              key={event.no}
              xs={12}
              md={6}
              lg={4}
              onClick={() => navigate(`/eventRead/${event.no}`)}
            >
              <Card className={`EventListViewWrap-card ${getDarkModeHover()}`}>
                {/* ✅ 스타일 개선된 진행 상태 배지 */}
                <Badge className={`event-status-badge ${badgeVariant}`}>
                  <Icon className="me-1" /> {eventStatus}
                </Badge>

                <Card.Img
                  variant="top"
                  src={event.thumbUrl}
                  className="EventListViewWrap-card-img"
                />
                <Card.Body>
                  <Card.Title className="EventListViewWrap-title">
                    {event.name}
                  </Card.Title>
                  <Card.Text className="EventListViewWrap-period">
                    {event.startDate} ~ {event.endDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* ✅ 무한 스크롤 감지 대상 */}
      <div
        ref={observerRef}
        style={{ height: '20px', background: 'transparent' }}
      />

      {/* ✅ 추가 로딩 스피너 (스크롤 하단에서) */}
      {isLoading && eventList.length > 0 && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <br />
      <br />
    </Container>
  );
};

export default EventListViewWrap;
