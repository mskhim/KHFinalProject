import { useContext, useEffect, useState, useRef } from 'react';
import { Form, Button, Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { ButtonDarkMode, ButtonRoleAndUserNo } from '../../../components/ui';
import { Context } from '../../../Context';
import {
  selectEventReview,
  insertEventReview,
  deleteEventReview,
} from '../eventApi';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../user/userApi';

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

const ReviewSection = () => {
  // ⬅ `rating` 기본값 설정
  const { getDarkMode } = useContext(Context);
  const contentRef = useRef(null);
  const param = useParams();
  const [eventReview, setEventReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [newRating, setNewRating] = useState(5);
  const [pagenation, setPagenation] = useState(1);
  const [prePagenation, setPrePagenation] = useState(1);
  const [firstPage, setFirstPage] = useState(1);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5, // 기본 별점
    content: '',
  });

  const getEventReview = async () => {
    setIsLoading(true);
    const response = await selectEventReview(param.no, page);
    setEventReview(response.dataList);
    setRating(response.rating);
    setPrePagenation(
      Math.floor(
        response.count / reviewsPerPage +
          (response.count % reviewsPerPage === 0 ? 0 : 1)
      )
    );
    if (prePagenation > 5) {
      setPagenation(5);
    } else {
      setPagenation(
        Math.floor(
          response.count / reviewsPerPage +
            (response.count % reviewsPerPage === 0 ? 0 : 1)
        )
      );
    }
    setIsLoading(false);
  };
  const pageNext = () => {
    setPage((prev) => Math.min(prev + 1, prePagenation));

    if (page > firstPage + 4) {
      setFirstPage((prev) => Math.min(prev + 1, prePagenation - 4));
    }
  };
  const pagePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    if (page < firstPage) {
      setFirstPage((prev) => Math.max(prev - 1, 1));
    }
  };

  useEffect(() => {
    getEventReview();
  }, [page, newReview]);

  // 리뷰 추가
  const addReview = async () => {
    const user = await getUserData();
    if (!user) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    if (!contentRef.current.value) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    // ✅ `setState`의 최신 값으로 API 실행
    setNewReview(async (prev) => {
      const updatedReview = {
        ...prev,
        name: user.name,
        eventNo: param.no,
        userAccountNo: user.no,
        content: contentRef.current.value,
        rating: newRating,
      };
      console.log('최신 newReview:', updatedReview); // ✅ 최신 값 확인
      await insertEventReview(updatedReview); // ✅ 최신 상태를 반영한 값으로 API 호출
      setNewReview({ rating: 5, content: '' }); // ✅ 리뷰 작성 후 초기화
      setPage(1);
      contentRef.current.value = ''; // ✅ 리뷰 작성 후 초기화
    });
  };
  const hadleDeleteReview = async (userNo, reviewNo) => {
    const response = await deleteEventReview(userNo, reviewNo);
    setPage(1);
    setNewReview({ rating: 5, content: '' });
  };

  return (
    <div className="review-section p-3 border rounded">
      <h3>Review</h3>

      {/* ⭐ 평균 별점 표시 */}
      <div className="mb-3 d-flex align-items-center">
        <strong style={{ marginRight: '10px' }}>전체 리뷰 평균 :</strong>
        <StarRating rating={rating} />
      </div>

      {/* ⭐ 리뷰 작성 (별점 선택 가능) */}
      <Form>
        <Row className="mb-2">
          <Col md={3}>
            <strong>별점 선택 :</strong>
            <StarRating
              rating={newRating}
              setRating={(value) => setNewRating(value)}
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
              ref={contentRef}
            />
          </Col>
        </Row>
        <br />
        <ButtonDarkMode text="리뷰 작성" onClick={addReview} width={'w-100'}>
          리뷰 작성
        </ButtonDarkMode>
      </Form>
      <hr />

      {/* 리뷰 목록 */}
      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : eventReview.length === 0 ? (
        <div>리뷰가 존재하지 않습니다.</div>
      ) : (
        eventReview.map((review, index) => (
          <div key={index} className="p-2 border-bottom">
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <strong>{review.name}</strong> &nbsp;({review.subDate})
                  <span style={{ marginLeft: '10px' }}>
                    <StarRating rating={review.rating} />
                  </span>
                </div>
                <div>
                  <ButtonRoleAndUserNo
                    text={'삭제'}
                    userNo={review.userAccountNo}
                    role={'user'}
                    onClick={() =>
                      hadleDeleteReview(review.userAccountNo, review.no)
                    }
                  />
                </div>
              </div>
            </div>
            <p>{review.content}</p>
          </div>
        ))
      )}

      <Pagination
        className={`justify-content-center mt-3 ${getDarkMode()} custom-pagination`}
      >
        <Pagination.Prev onClick={pagePrev} disabled={page === 1} />
        {[...Array(pagenation).keys()].map((num) => (
          <Pagination.Item
            key={num + firstPage}
            active={num + firstPage === page}
            onClick={() => setPage(num + firstPage)}
          >
            {num + firstPage}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={pageNext} disabled={page === prePagenation} />
      </Pagination>
    </div>
  );
};

export default ReviewSection;
