import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context';
import { getCartData, deleteCartData } from './userApi';  // 
import './css/UserCart.css';
import Payment from '../../components/Payment';
// deleteCartData를 import합니다.

function UserCart() {
  // 장바구니에 담긴 아이템들 초기 상태 설정
  const [cartItems, setCartItems] = useState([]); // 빈 배열로 초기화 및 장바구니에 담긴 아이템들을 저장.

  const { getDarkMode, getDarkModeHover } = useContext(Context);

  // 선택된 아이템들을 저장하는 상태
  const [selectedItems, setSelectedItems] = useState([]);  // 선택된 아이템들의 ID 저장

  // 총 결제 금액을 저장하는 상태
  const [totalAmount, setTotalAmount] = useState(0);  // 결제 금액 초기화

  // 수량 변경 시 호출되는 함수
  const handleQuantityChange = (id, change) => {
    setCartItems(prevCartItems => {
      // 장바구니 아이템 중에서 해당 id를 가진 아이템의 수량을 변경
      const updatedCart = prevCartItems.map(item =>
        item.no === id ? { 
          ...item, 
          qt: Math.max(item.qt + change, 1)  // 수량이 1 이하로 내려가지 않게 처리
        } : item  
      );

      // 변경된 장바구니 상태 반환
      return updatedCart;
    });
  };

  const handleRemoveItem = async (id) => {
    // 삭제 확인을 위한 alert
    const confirmDelete = window.confirm("해당 항목을 삭제하시겠습니까?");
  
    if (confirmDelete) {
      // 서버에서 해당 아이템을 삭제하는 API 호출
      const result = await deleteCartData({ no: id });  // Cart 객체를 전달
  
      if (result.authenticated) {
        // 성공적으로 삭제되면 UI에서 해당 아이템을 제거
        const updatedCart = cartItems.filter(item => item.no !== id);
        setCartItems(updatedCart);
  
        // 삭제된 아이템을 선택된 아이템 목록에서 제거
        setSelectedItems(prevSelectedItems => {
          const updatedSelectedItems = prevSelectedItems.filter(itemId => itemId !== id);
          // 삭제 후, 선택된 항목들의 총 금액을 다시 계산
          calculateTotalAmount(updatedSelectedItems);  // 삭제된 항목을 제외하고 계산
          return updatedSelectedItems; // 상태 업데이트 후 리턴
        });
  
        alert("삭제가 완료되었습니다.");  // 성공 메시지
      } else {
        alert(result.message || '아이템 삭제 실패');  // 실패 메시지
      }
     } 
     // else {
    //   // 사용자가 삭제를 취소한 경우
    //   alert("삭제가 취소되었습니다.");
    // }
  };
  

    // 모달을 띄우기 위한 상태
    const [showPayment, setShowPayment] = useState(false);

    // '결제하기' 버튼 클릭 시 호출되는 함수
    const handleCheckout = () => {
      setShowPayment(true);  // Payment 컴포넌트 보이게 설정
    };
  
    // Payment 컴포넌트를 닫는 함수
    const handleClosePayment = () => {
      setShowPayment(false);  // Payment 컴포넌트 숨기기
    };
  

  // 개별 아이템을 선택하거나 선택 해제하는 함수
  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      // 선택된 항목 배열에서 해당 아이템 id가 있으면 제거하고, 없으면 추가
      const newSelected = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];

      // 선택된 항목들에 대한 총 결제 금액 계산
      return newSelected;
    });
  };

  // 모든 아이템을 선택하거나 선택 해제하는 함수
  const handleSelectAll = () => {
    // 전체 선택 체크박스를 클릭했을 때, 모든 아이템을 선택하거나 선택 해제
    const newSelected = selectedItems.length === cartItems.length ? [] : cartItems.map(item => item.no);
    setSelectedItems(newSelected);  // 선택된 아이템 목록 업데이트
  };

  // 선택된 항목들의 총 결제 금액을 계산하는 함수
  const calculateTotalAmount = (selected) => {
    // 선택된 항목들에 대해서 가격 * 수량을 더하여 총 금액을 계산
    const total = selected.reduce((sum, id) => {
      const item = cartItems.find(i => i.no === id);  // 해당 아이템을 찾기
      if (item && item.price && item.qt) {
        return sum + item.price * item.qt;  // 가격 * 수량을 더한 값을 반환
      }
      return sum;
    }, 0);
    
    // 계산된 총 결제 금액을 상태에 업데이트
    setTotalAmount(total);
  };

  // cartItems 또는 selectedItems가 변경될 때마다 총 결제 금액을 자동으로 계산
  useEffect(() => {
    calculateTotalAmount(selectedItems);  // selectedItems 변경될 때마다 총 금액 계산
  }, [cartItems, selectedItems]);  // cartItems와 selectedItems가 변경될 때마다 실행

  // 컴포넌트가 처음 렌더링될 때, 장바구니 데이터를 불러오는(가져오는 useEffect) 함수.
  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCartData();  // getCartData 함수로 장바구니 데이터 받아오기
      if (cartData && cartData.length > 0) {
        setCartItems(cartData);  // 받아온 장바구니 데이터 상태에 설정
      }
    };

    fetchCartData();  // 장바구니 데이터 호출
  }, []);  // 처음 렌더링될 때 한 번만 호출

  return (
    <>
      {/* Header 컴포넌트 */}
      <Header />
      <div className={`Cart-container ${getDarkMode()}`}>
        <header className={`Cart-header ${getDarkMode()}`}>
          <h1>장바구니</h1>
        </header>

        <div className={`Cart-wrapper ${getDarkMode()}`}>
          <table className={`Cart-table ${getDarkMode()}`}>
            <thead className={`Cart-thead ${getDarkMode()}`}>
              <tr>
                <th>
                  {/* 전체 선택 체크박스 */}
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartItems.length}  // 모든 항목이 선택되었을 때 체크박스 선택
                    onChange={handleSelectAll}  // 체크박스 클릭 시 모든 항목 선택
                    disabled={cartItems.length === 0}  // 장바구니에 항목이 없으면 체크박스 비활성화
                  />
                </th>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <tr key={item.no} className={getDarkMode()}>
                    <td>
                      {/* 개별 항목 선택 체크박스 */}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.no)}  // 해당 항목이 선택되었을 때 체크박스 선택
                        onChange={() => handleSelectItem(item.no)}  // 항목 선택 시 해당 아이템만 선택/해제
                        disabled={cartItems.length === 0}  // 장바구니에 항목이 없으면 체크박스 비활성화
                      />
                    </td>
                    <td>
                      <div className="Cart-festival-info">
                        <div className="Cart-festival-text">
                          <h3>
                            <a href="#" className={`Cart-festival-link ${getDarkMode()}`}>{item.name}</a>
                          </h3>
                          <p className={`Cart-festival-date ${getDarkMode()}`}>축제 일시 : {item.startDate} ~ {item.endDate}</p>
                          <p className={`Cart-festival-description ${getDarkMode()}`}>상세 설명 : {item.content}</p>
                        </div>
                      </div>
                    </td>

                    {/* 가격 * 수량 출력 */}
                    <td className={getDarkMode()} style={{ width: '20%' }}>{(item.price * item.qt).toLocaleString()} 원</td>
                    <td>
                      <div className="Cart-item-quantity">
                        {/* 수량 조절 버튼 */}
                        <button
                          className={`Cart-quantity-btn ${getDarkModeHover()}`}
                          onClick={() => handleQuantityChange(item.no, -1)}  // 수량 -1
                        >
                          -
                        </button>
                        <span className="Cart-quantity-display">{item.qt}</span>
                        <button
                          className={`Cart-quantity-btn ${getDarkModeHover()}`}
                          onClick={() => handleQuantityChange(item.no, 1)}  // 수량 +1
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {/* 아이템 삭제 버튼 */}
                      <button
                        className={`Cart-remove-btn ${getDarkMode()}`}
                        onClick={() => handleRemoveItem(item.no)}  // 아이템 삭제
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" align="center" style={{ textAlign: 'center' }}>장바구니에 항목이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={`Cart-summary ${getDarkMode()}`}>
            <p className={getDarkMode()}>총 {selectedItems.length}개의 항목이 선택되었습니다.</p>
            <p className={getDarkMode()}>총 결제 금액 : {totalAmount.toLocaleString()} 원</p>
            {/* 결제 버튼 */}
            <button className={`Cart-checkout-btn ${getDarkModeHover()}`} onClick={handleCheckout}>
              결제하기
            </button>
          </div>
        </div>

        {/* Payment 컴포넌트 표시 여부 체크 */}
        {showPayment && (
          <div className="Payment-modal">
            <Payment /> {/* Payment 컴포넌트 렌더링 */}
            <button onClick={handleClosePayment}>닫기</button> {/* 모달 닫기 버튼 */}
          </div>
        )}
      </div>
      {/* Footer 컴포넌트 */}
      <Footer />
    </>
  );
}

export default UserCart;
