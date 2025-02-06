import { useContext, useState } from 'react';
import { Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import { ButtonDarkMode } from '../../../components/ui';
import { Context } from '../../../Context';

// ⭐ 별점 컴포넌트 (상위 컴포넌트에서 받은 평균 별점 사용)
const StarRating = ({ rating = 0, setRating, interactive = false }) => {
  const totalStars = 5;
  const safeRating = Number(rating) || 0; // rating이 undefined이면 0으로 설정

  // 별점 입력 가능할 경우 클릭 핸들러 추가
  const handleClick = (index, event) => {
    if (!interactive || !setRating) return;
    const { clientX, target } = event;
    const rect = target.getBoundingClientRect();
    const isHalf = clientX < rect.left + rect.width / 2;
    setRating(index + (isHalf ? 0.5 : 1));
  };

  return (
    <div className="d-flex align-items-center">
      {/* 별점 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: interactive ? 'pointer' : 'default',
        }}
      >
        {Array.from({ length: totalStars }).map((_, index) => {
          const fillPercentage =
            Math.min(Math.max(safeRating - index, 0), 1) * 100;

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '20px',
                height: '20px',
                lineHeight: '20px',
              }}
              onClick={(event) => handleClick(index, event)}
            >
              {/* 회색 별 (빈 별) */}
              <span
                style={{
                  fontSize: '20px',
                  color: '#ddd',
                  position: 'absolute',
                  left: 0,
                }}
              >
                ★
              </span>
              {/* 채워진 별 (gold) */}
              <span
                style={{
                  fontSize: '20px',
                  color: 'gold',
                  position: 'absolute',
                  left: 0,
                  width: `${fillPercentage}%`,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                ★
              </span>
            </div>
          );
        })}
      </div>

      {/* 평점 숫자 (3.3 / 5.0) */}
      {!interactive && (
        <span style={{ marginLeft: '8px', fontSize: '1rem' }}>
          {safeRating.toFixed(1)} / 5.0
        </span>
      )}
    </div>
  );
};

const ReviewSection = ({ rating = 0 }) => {
  // ⬅ `rating` 기본값 설정
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
  ];

  const [reviews, setReviews] = useState(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5, // 기본 별점
    content: '',
  });

  // 현재 페이지에 해당하는 리뷰 가져오기
  const getCurrentPageReviews = () => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    return reviews.slice(startIndex, startIndex + reviewsPerPage);
  };

  // 리뷰 추가
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
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([newEntry, ...reviews]);
    setNewReview({ name: '', rating: 5, content: '' });
    setCurrentPage(1);
  };

  return (
    <div className="review-section p-3 border rounded">
      <h3>Review</h3>

      {/* ⭐ 평균 별점 표시 */}
      <div className="mb-3 d-flex align-items-center">
        <strong style={{ marginRight: '10px' }}>전체 리뷰 평균:</strong>
        <StarRating rating={rating} />
      </div>

      {/* ⭐ 리뷰 작성 (별점 선택 가능) */}
      <Form>
        <Row className="mb-2">
          <Col md={3}>
            <strong>별점 선택:</strong>
            <StarRating
              rating={newReview.rating}
              setRating={(value) =>
                setNewReview({ ...newReview, rating: value })
              }
              interactive={true}
            />
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
          <div className="d-flex align-items-center">
            <strong>{review.name}</strong> ({review.date})
            <span style={{ marginLeft: '10px' }}>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <p>{review.content}</p>
        </div>
      ))}

      {/* 페이지네이션 */}
      <Pagination
        className={`justify-content-center mt-3 ${getDarkMode()} custom-pagination`}
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
