import { useContext, useState } from 'react';
import { Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import { ButtonDarkMode } from '../../../components/ui';
import { Context } from '../../../Context';
const ReviewSection = () => {
  const { getDarkMode } = useContext(Context);
  const mockReviews = [
    {
      id: 1,
      name: '김철수',
      rating: 5,
      content: '정말 멋진 축제였어요!',
      date: '2025-10-06',
    },
    {
      id: 2,
      name: '이영희',
      rating: 4,
      content: '볼거리가 많았어요!',
      date: '2025-10-05',
    },
    {
      id: 3,
      name: '박민수',
      rating: 3,
      content: '그냥 그랬어요.',
      date: '2025-10-04',
    },
    {
      id: 4,
      name: '최수진',
      rating: 2,
      content: '기대보다 별로였어요.',
      date: '2025-10-03',
    },
    {
      id: 5,
      name: '정하나',
      rating: 1,
      content: '너무 사람이 많아서 불편했어요.',
      date: '2025-10-02',
    },
    {
      id: 6,
      name: '홍길동',
      rating: 5,
      content: '불꽃놀이가 환상적이었습니다!',
      date: '2025-10-01',
    },
    {
      id: 7,
      name: '이수진',
      rating: 4,
      content: '친구들과 좋은 추억 만들었어요.',
      date: '2025-09-30',
    },
    {
      id: 8,
      name: '박영호',
      rating: 5,
      content: '다시 가고 싶어요!',
      date: '2025-09-29',
    },
    {
      id: 9,
      name: '최민석',
      rating: 2,
      content: '생각보다 별로였어요.',
      date: '2025-09-28',
    },
    {
      id: 10,
      name: '정윤아',
      rating: 3,
      content: '평범한 축제였어요.',
      date: '2025-09-27',
    },
  ]; // 목업 데이터 (10개)

  const [reviews, setReviews] = useState(mockReviews); // 리뷰 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const reviewsPerPage = 5; // 한 페이지당 5개 리뷰 표시
  const totalPages = Math.ceil(reviews.length / reviewsPerPage); // 총 페이지 수 계산

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    content: '',
  });

  // 현재 페이지에 해당하는 리뷰 가져오기
  const getCurrentPageReviews = () => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  // 리뷰 추가 (목업 데이터 기반)
  const addReview = () => {
    if (!newReview.name || !newReview.content) {
      alert('이름과 리뷰 내용을 입력해주세요!');
      return;
    }

    const newEntry = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0], // 현재 날짜
    };

    setReviews([newEntry, ...reviews]); // 새 리뷰를 맨 앞에 추가
    setNewReview({ name: '', rating: 5, content: '' }); // 입력 필드 초기화
    setCurrentPage(1); // 최신 리뷰를 보기 위해 첫 페이지로 이동
  };

  return (
    <div className="review-section p-3 border rounded">
      <h3>Review</h3>
      <Form>
        <Row className="mb-2">
          <Col md={3}>
            <Form.Select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
            >
              <option value={5}>⭐⭐⭐⭐⭐ </option>
              <option value={4}>⭐⭐⭐⭐ </option>
              <option value={3}>⭐⭐⭐ </option>
              <option value={2}>⭐⭐ </option>
              <option value={1}>⭐ </option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="리뷰 내용을 입력하세요"
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
            />
          </Col>
        </Row>
        <ButtonDarkMode text="리뷰 작성" onClick={addReview}>
          리뷰 작성
        </ButtonDarkMode>
      </Form>
      <hr />

      {/* 리뷰 목록 */}
      {getCurrentPageReviews().map((review) => (
        <div key={review.id} className="p-2 border-bottom">
          <p>
            <strong>{review.name}</strong> ({review.date}){' '}
            <span style={{ color: 'gold' }}>{'⭐'.repeat(review.rating)}</span>
          </p>
          <p>{review.content}</p>
        </div>
      ))}

      {/* 페이지네이션 */}
      <Pagination
        className={`justify-content-center mt-3 custom-pagination ${getDarkMode()}`}
      >
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default ReviewSection;
