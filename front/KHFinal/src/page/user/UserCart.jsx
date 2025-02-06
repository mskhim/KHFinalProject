import React, { useState } from 'react';
import './css/UserCart.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function UserCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      festivalName: '축제01',
      quantity: 2,
      date: '2025-05-01',
      endDate: '2025-05-03',
      description: '이 축제는 다양한 문화 공연과 체험이 가득한 축제입니다!',
      price: 50000,
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

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // 수량 변경 시 선택된 항목들만 기준으로 금액 계산
  const handleQuantityChange = (id, change) => {
    setCartItems(prevCartItems => {
      const updatedCart = prevCartItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      );
      
      // 수량 변경 후 선택된 항목들만 기준으로 총 금액을 계산
      calculateTotalAmount(selectedItems);
      return updatedCart;
    });
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    
    // 항목 삭제 후 선택된 항목들만 기준으로 총 금액을 계산
    calculateTotalAmount(selectedItems);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      const newSelected = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      
      // 선택된 항목들만 기준으로 총 금액을 계산
      calculateTotalAmount(newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const newSelected = selectedItems.length === cartItems.length ? [] : cartItems.map(item => item.id);
    setSelectedItems(newSelected);
    calculateTotalAmount(newSelected);
  };

  // 선택된 항목들만 기준으로 총 금액을 계산
  const calculateTotalAmount = (selected) => {
    const total = selected.reduce((sum, id) => {
      const item = cartItems.find(i => i.id === id);
      return sum + item.price * item.quantity;
    }, 0);
    setTotalAmount(total);
  };
  return (
    <>
      <Header />
      <div className="Cart-container">
      <header className="Cart-header">
        <h1>장바구니</h1>
      </header>

      <div className="Cart-wrapper">
        <table className="Cart-table">
          <thead className='Cart-thead'>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td>
                    <div className="Cart-festival-info">
                      <div className="Cart-festival-text">
                        <h3>
                          <a href="#" className="Cart-festival-link">{item.festivalName}</a>
                        </h3>
                        <p className="Cart-festival-date">축제 일시 : {item.date} ~ {item.endDate}</p>
                        <p className="Cart-festival-description">상세 설명 : {item.description}</p>
                      </div>
                    </div>
                  </td>

                  <td>{item.price.toLocaleString()} 원</td>
                  <td>
                    <div className="Cart-item-quantity">
                      <button
                        className="Cart-quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="Cart-quantity-display">{item.quantity}</span>
                      <button
                        className="Cart-quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="Cart-remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
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

        <div className="Cart-summary">
          <p>총 {selectedItems.length}개의 항목이 선택되었습니다.</p>
          <p>총 결제 금액: {totalAmount.toLocaleString()} 원</p>
          <button className="Cart-checkout-btn">결제하기</button>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default UserCart;
