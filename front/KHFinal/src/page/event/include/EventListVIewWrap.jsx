import { useContext, useState } from 'react';
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

const EventListViewWrap = () => {
  const navigate = useNavigate();
  // ✅ 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 전체 페이지 개수
  const { getDarkModeHover, getDarkMode } = useContext(Context);

  // ✅ 정렬 상태
  const [sortOption, setSortOption] = useState('popular'); // "popular" | "date"

  // ✅ 정렬 옵션 변경
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // ✅ 스프링부트에서 가져오는 9개 데이터 (현재 페이지 기준)
  const events = [
    {
      no: 1,
      title: '서울 불꽃축제',
      period: '2024.10.05',
      img: 'https://picsum.photos/400/250?random=1',
      popularity: 5,
    },
    {
      no: 2,
      title: '부산 국제 영화제',
      period: '2024.09.01',
      img: 'https://picsum.photos/400/250?random=2',
      popularity: 8,
    },
    {
      no: 3,
      title: '제주 감귤 축제',
      period: '2024.11.15',
      img: 'https://picsum.photos/400/250?random=3',
      popularity: 3,
    },
    {
      no: 4,
      title: '춘천 마임 축제',
      period: '2024.06.01',
      img: 'https://picsum.photos/400/250?random=4',
      popularity: 7,
    },
    {
      no: 5,
      title: '안동 국제 탈춤 페스티벌',
      period: '2024.10.10',
      img: 'https://picsum.photos/400/250?random=5',
      popularity: 6,
    },
    {
      no: 6,
      title: '진주 남강 유등축제',
      period: '2024.10.03',
      img: 'https://picsum.photos/400/250?random=6',
      popularity: 9,
    },
    {
      no: 7,
      title: '전주 한옥마을 축제',
      period: '2024.05.20',
      img: 'https://picsum.photos/400/250?random=7',
      popularity: 4,
    },
    {
      no: 8,
      title: '강릉 단오제',
      period: '2024.06.10',
      img: 'https://picsum.photos/400/250?random=8',
      popularity: 10,
    },
    {
      no: 9,
      title: '대구 치맥 페스티벌',
      period: '2024.07.24',
      img: 'https://picsum.photos/400/250?random=9',
      popularity: 2,
    },
  ];

  // ✅ 정렬 로직 적용
  const sortedEvents = [...events].sort((a, b) => {
    if (sortOption === 'popular') {
      return b.popularity - a.popularity; // 인기순 (높은 값이 먼저)
    } else if (sortOption === 'date') {
      return new Date(a.period) - new Date(b.period); // 개최일순 (이전 날짜가 먼저)
    }
    return 0;
  });

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
        {sortedEvents.map((event) => (
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
                src={event.img}
                className="EventListViewWrap-card-img"
              />
              <Card.Body>
                <Card.Title className="EventListViewWrap-title">
                  {event.title}
                </Card.Title>
                <Card.Text className="EventListViewWrap-period">
                  {event.period}
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
