import { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonRole } from '../../../components/ui';
import './css/EventListViewWrap.css';
import { Context } from '../../../Context';
import { selectEventList } from '../eventApi';

const EventListViewWrap = () => {
  const navigate = useNavigate();
  // ✅ 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 전체 페이지 개수
  const { getDarkModeHover, getDarkMode } = useContext(Context);
  const [eventList, setEventList] = useState([]); // 이벤트 리스트
  // ✅ 정렬 상태
  const [sortOption, setSortOption] = useState('popular'); // "popular" | "date"

  useEffect(() => {
    const getEventList = async () => {
      const dataList = await selectEventList(currentPage);
      setEventList(dataList);
    };
    getEventList();
  }, [currentPage]);

  // ✅ 정렬 옵션 변경
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // ✅ 스프링부트에서 가져오는 9개 데이터 (현재 페이지 기준)

  // ✅ 정렬 로직 적용
  const sortedEvents = [].sort((a, b) => {});

  // ✅ 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Fetching data for page: ${page}`);
    }
  };

  return (
    <Container className="EventListViewWrap-container py-4 px-4">
      {/* ✅ 정렬 버튼 (상단 오른쪽) */}
      <div className="d-flex justify-content-end mb-3">
        <ButtonGroup>
          <Button
            className={`EventListVIewWrap-sort-button ${getDarkModeHover()} ButtonGroup ${
              sortOption === 'popular' ? 'active' : ''
            } `}
            onClick={() => handleSortChange('popular')}
            variant="none"
          >
            인기순
          </Button>
          <Button
            className={`EventListVIewWrap-sort-button ${getDarkModeHover()} ButtonGroup ${
              sortOption === 'date' ? 'active' : ''
            } `}
            onClick={() => handleSortChange('date')}
            variant="none"
          >
            개최일순
          </Button>
        </ButtonGroup>
      </div>
      <br />
      {/* ✅ 이벤트 카드 목록 */}
      <Row className="g-4">
        {eventList.map((event) => (
          <Col
            key={event.no}
            xs={12}
            md={6}
            lg={4}
            onClick={() => navigate(`/eventRead/${event.no}`)}
          >
            <Card className={`EventListViewWrap-card ${getDarkModeHover()}`}>
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
        ))}
      </Row>
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-end">
        <ButtonRole
          text="추가 forManager"
          role="manager"
          onClick={() => {
            navigate('/manager/managerEventInsert');
          }}
        />
      </div>
      {/* ✅ 페이지네이션 */}
      <Pagination
        className={`EventListViewWrap-custom-pagination justify-content-center mt-4 ${getDarkMode()}`}
        variant="dark"
      >
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
    </Container>
  );
};

export default EventListViewWrap;
