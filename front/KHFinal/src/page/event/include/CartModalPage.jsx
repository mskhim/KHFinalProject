import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartModalPage = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  const goToCart = () => {
    setShowModal(false);
    navigate('/user/userCart');
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">추가 완료</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>장바구니로 이동하시겠습니까?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                아니오
              </button>
              <button className="btn btn-primary" onClick={goToCart}>
                예
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 배경 (닫기 가능) */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
};

export default CartModalPage;
