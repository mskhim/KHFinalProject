import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context';
import './css/UserCart.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function UserCart() {
  // 장바구니에 담긴 아이템들 초기 상태 설정
  const [cartItems, setCartItems] = useState([  // 초기 장바구니 아이템들 설정
    {
      id: 1,
      festivalName: '축제01',
      quantity: 2,  // 수량
      date: '2025-05-01',
      endDate: '2025-05-03',
      description: '이 축제는 다양한 문화 공연과 체험이 가득한 축제입니다!',
      price: 50000,  // 가격
    },
    {
      id: 2,
      festivalName: '축제02',
      quantity: 1,
      date: '2025-07-15',
      endDate: '2025-07-17',
      description: '음악과 미술 작품들이 어우러지는 아름다운 축제!',
      price: 30000,
    },
    {
      id: 3,
      festivalName: '축제03',
      quantity: 3,
      date: '2025-08-10',
      endDate: '2025-08-12',
      description: '모든 연령대가 즐길 수 있는 활동과 체험으로 가득한 축제!',
      price: 45000,
    },
    {
      id: 4,
      festivalName: '축제04',
      quantity: 1,
      date: '2025-09-01',
      endDate: '2025-09-05',
      description: '최고의 공연과 음식들이 함께하는 축제!',
      price: 60000,
    },
  ]);

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
        item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item  // 수량이 1 이하로 내려가지 않게 처리
      );

      // 변경된 장바구니 상태 반환
      return updatedCart;
    });
  };

  // 아이템을 장바구니에서 삭제하는 함수
  const handleRemoveItem = (id) => {
    // 해당 id를 가진 아이템을 장바구니에서 삭제
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);

    // 삭제된 아이템을 선택된 아이템 목록에서 제거
    setSelectedItems(prevSelectedItems => prevSelectedItems.filter(itemId => itemId !== id));

    // 삭제 후, 선택된 항목들의 총 금액을 다시 계산
    calculateTotalAmount(selectedItems.filter(itemId => itemId !== id));  // 삭제된 항목을 제외하고 계산
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
    const newSelected = selectedItems.length === cartItems.length ? [] : cartItems.map(item => item.id);
    setSelectedItems(newSelected);  // 선택된 아이템 목록 업데이트
  };

  // 선택된 항목들의 총 결제 금액을 계산하는 함수
  const calculateTotalAmount = (selected) => {
    // 선택된 항목들에 대해서 가격 * 수량을 더하여 총 금액을 계산
    const total = selected.reduce((sum, id) => {
      const item = cartItems.find(i => i.id === id);  // 해당 아이템을 찾기
      return sum + item.price * item.quantity;  // 가격 * 수량을 더한 값을 반환
    }, 0);
    
    // 계산된 총 결제 금액을 상태에 업데이트
    setTotalAmount(total);
  };

  // cartItems 또는 selectedItems가 변경될 때마다 총 결제 금액을 자동으로 계산
  useEffect(() => {
    calculateTotalAmount(selectedItems);  // selectedItems 변경될 때마다 총 금액 계산
  }, [cartItems, selectedItems]);  // cartItems와 selectedItems가 변경될 때마다 실행

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
                  <tr key={item.id} className={getDarkMode()}>
                    <td>
                      {/* 개별 항목 선택 체크박스 */}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}  // 해당 항목이 선택되었을 때 체크박스 선택
                        onChange={() => handleSelectItem(item.id)}  // 항목 선택 시 해당 아이템만 선택/해제
                      />
                    </td>
                    <td>
                      <div className="Cart-festival-info">
                        <div className="Cart-festival-text">
                          <h3>
                            <a href="#" className={`Cart-festival-link ${getDarkMode()}`}>{item.festivalName}</a>
                          </h3>
                          <p className={`Cart-festival-date ${getDarkMode()}`}>축제 일시 : {item.date} ~ {item.endDate}</p>
                          <p className={`Cart-festival-description ${getDarkMode()}`}>상세 설명 : {item.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className={getDarkMode()}>{item.price.toLocaleString()} 원</td>
                    <td>
                      <div className="Cart-item-quantity">
                        {/* 수량 조절 버튼 */}
                        <button
                          className={`Cart-quantity-btn ${getDarkModeHover()}`}
                          onClick={() => handleQuantityChange(item.id, -1)}  // 수량 -1
                        >
                          -
                        </button>
                        <span className="Cart-quantity-display">{item.quantity}</span>
                        <button
                          className={`Cart-quantity-btn ${getDarkModeHover()}`}
                          onClick={() => handleQuantityChange(item.id, 1)}  // 수량 +1
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {/* 아이템 삭제 버튼 */}
                      <button
                        className={`Cart-remove-btn ${getDarkMode()}`}
                        onClick={() => handleRemoveItem(item.id)}  // 아이템 삭제
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">장바구니에 항목이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={`Cart-summary ${getDarkMode()}`}>
            <p className={getDarkMode()}>총 {selectedItems.length}개의 항목이 선택되었습니다.</p>
            <p className={getDarkMode()}>총 결제 금액 : {totalAmount.toLocaleString()} 원</p>
            {/* 결제 버튼 */}
            <button className={`Cart-checkout-btn ${getDarkModeHover()}`}>결제하기</button>
          </div>
        </div>
      </div>
      {/* Footer 컴포넌트 */}
      <Footer />
    </>
  );
}

export default UserCart;
