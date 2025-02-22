import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { Context } from '../../Context';
import { getCartData, deleteCartData } from './userApi';
import './css/UserCart.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // ✅ Spinner import

function UserCart() {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 사용

  // 장바구니에 담긴 아이템들 초기 상태 설정
  const [cartItems, setCartItems] = useState([]); // 빈 배열로 초기화 및 장바구니에 담긴 아이템들을 저장.

  const { getDarkMode, getDarkModeHover } = useContext(Context);

  // 선택된 아이템들을 저장하는 상태
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 아이템들의 ID 저장

  // 총 결제 금액을 저장하는 상태
  const [totalAmount, setTotalAmount] = useState(0); // 결제 금액 초기화

  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  // 수량 변경 시 호출되는 함수
  const handleQuantityChange = useCallback((id, change) => {
    setCartItems((prevCartItems) => {
      // 장바구니 아이템 중에서 해당 id를 가진 아이템의 수량을 변경
      const updatedCart = prevCartItems.map((item) =>
        item.no === id
          ? { ...item, qt: Math.max(item.qt + change, 1) } // 최소 수량 1 보장
          : item
      );

      return updatedCart;
    });
    // ✅ 선택된 아이템도 업데이트 (수량이 변경되었을 경우)
    setSelectedItems((prevSelected) =>
      prevSelected.map((selected) =>
        selected.id === id
          ? { ...selected, qt: Math.max(selected.qt + change, 1) } // 수량 업데이트
          : selected
      )
    );
  }, []);

  const handleRemoveItem = useCallback(
    async (id) => {
      // 삭제 확인을 위한 alert
      const confirmDelete = window.confirm('해당 항목을 삭제하시겠습니까?');

      if (confirmDelete) {
        // 서버에서 해당 아이템을 삭제하는 API 호출
        const result = await deleteCartData({ no: id }); // Cart 객체를 전달

        if (result.authenticated) {
          // 성공적으로 삭제되면 UI에서 해당 아이템을 제거
          const updatedCart = cartItems.filter((item) => item.no !== id);
          setCartItems(updatedCart);

          // 삭제된 아이템을 선택된 아이템 목록에서 제거
          setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = prevSelectedItems.filter(
              (itemId) => itemId !== id
            );
            // 삭제 후, 선택된 항목들의 총 금액을 다시 계산
            calculateTotalAmount(updatedSelectedItems); // 삭제된 항목을 제외하고 계산
            return updatedSelectedItems; // 상태 업데이트 후 리턴
          });

          alert('삭제가 완료되었습니다.'); // 성공 메시지
        } else {
          alert(result.message || '아이템 삭제 실패'); // 실패 메시지
        }
      }
      // else {
      //   // 사용자가 삭제를 취소한 경우
      //   alert("삭제가 취소되었습니다.");
      // }
    },
    [cartItems]
  );

  const handleCheckout = useCallback(() => {
    if (!selectedItems || selectedItems.length === 0) {
      alert('❌ 결제할 상품을 선택하세요!');
      return; // ✅ 선택된 아이템이 없으면 실행 중단
    }

    navigate('/user/payment', { state: { selectedItems, totalAmount } }); // ✅ 선택된 아이템이 있으면 페이지 이동
  }, [selectedItems, totalAmount, navigate]);

  // 개별 아이템을 선택하거나 선택 해제하는 함수
  const handleSelectItem = useCallback(
    (item) => {
      setSelectedItems((prev) => {
        const exists = prev.some((selected) => selected.id === item.no);

        // 이미 선택된 경우 → 제거, 선택되지 않은 경우 → 추가
        return exists
          ? prev.filter((selected) => selected.id !== item.no)
          : [
              ...prev,
              {
                id: item.no,
                name: item.name,
                price: item.price,
                qt: item.qt,
                eventNo: item.eventNo,
              },
            ];
      });
    },
    [selectedItems]
  );

  // 모든 아이템을 선택하거나 선택 해제하는 함수
  const handleSelectAll = useCallback(() => {
    const newSelected =
      selectedItems.length === cartItems.length
        ? [] // 이미 다 선택되어 있으면 전체 해제
        : cartItems.map((item) => ({
            id: item.no,
            name: item.name,
            price: item.price,
            qt: item.qt,
            eventNo: item.eventNo,
          }));

    setSelectedItems(newSelected);
  }, [cartItems, selectedItems]);

  // 선택된 항목들의 총 결제 금액을 계산하는 함수
  const calculateTotalAmount = useCallback(() => {
    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.qt,
      0
    );
    setTotalAmount(total);
  }, [selectedItems]);

  // selectedItems가 변경될 때마다 총 결제 금액을 자동으로 계산
  useEffect(() => {
    calculateTotalAmount();
  }, [selectedItems]); // selectedItems가 변경될 때마다 실행

  // 컴포넌트가 처음 렌더링될 때, 장바구니 데이터를 불러오는(가져오는 useEffect) 함수.
  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCartData(); // getCartData 함수로 장바구니 데이터 받아오기
      if (cartData && cartData.length > 0) {
        setCartItems(cartData); // 받아온 장바구니 데이터 상태에 설정
      }
      setIsLoading(false); // ✅ 데이터 로딩 완료
    };

    fetchCartData(); // 장바구니 데이터 호출
  }, []); // 처음 렌더링될 때 한 번만 호출

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  // item.name 클릭 시 호출되는 함수
  const handleItemClick = useCallback(
    (eventNo) => {
      navigate(`/eventRead/${eventNo}`); // eventRead 페이지로 이동
    },
    [navigate]
  );

  const header = useMemo(() => <Header />, []);
  const footer = useMemo(() => <Footer />, []);

  return (
    <>
      {header}
      <div className={`Cart-container ${getDarkMode()}`}>
        <header className={`Cart-header ${getDarkMode()}`}>
          <h1>장바구니</h1>
        </header>

        <div className={`Cart-wrapper ${getDarkMode()}`}>
          {/* ✅ 로딩 중이면 스피너 표시 */}
          {isLoading && cartItems.length === 0 && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {/* ✅ 로딩이 완료되면 테이블 표시 */}
          {!isLoading && (
            <table className={`Cart-table ${getDarkMode()}`}>
              <thead className={`Cart-thead ${getDarkMode()}`}>
                <tr>
                  <th>
                    {/* 전체 선택 체크박스 */}
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length} // 모든 항목이 선택되었을 때 체크박스 선택
                      onChange={handleSelectAll} // 체크박스 클릭 시 모든 항목 선택
                      disabled={cartItems.length === 0} // 장바구니에 항목이 없으면 체크박스 비활성화
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
                  cartItems.map((item) => (
                    <tr key={item.no} className={getDarkMode()}>
                      <td>
                        {/* 개별 항목 선택 체크박스 */}
                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (selected) => selected.id === item.no
                          )} // 객체 리스트에서 ID 비교
                          onChange={() => handleSelectItem(item)} // `item` 전체 객체 전달
                          disabled={cartItems.length === 0} // 장바구니에 항목이 없으면 체크박스 비활성화
                        />
                      </td>
                      <td>
                        <div className="Cart-festival-info">
                          <div className="Cart-festival-text">
                            <h3>
                              <span
                                onClick={() => handleItemClick(item.eventNo)} // 클릭 시 handleItemClick 함수 호출
                                className={`Cart-festival-link ${getDarkMode()}`}
                                style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
                              >
                                {item.name}
                              </span>
                            </h3>
                            <p
                              className={`Cart-festival-date ${getDarkMode()}`}
                            >
                              축제 일시 : {item.startDate} ~ {item.endDate}
                            </p>
                            <p
                              className={`Cart-festival-description ${getDarkMode()}`}
                            >
                              상세 설명 : {item.content}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 가격 * 수량 출력 */}
                      <td className={getDarkMode()} style={{ width: '20%' }}>
                        {(item.price * item.qt).toLocaleString()} 원
                      </td>
                      <td>
                        <div className="Cart-item-quantity">
                          {/* 수량 조절 버튼 */}
                          <button
                            className={`Cart-quantity-btn ${getDarkModeHover()}`}
                            onClick={() => handleQuantityChange(item.no, -1)} // 수량 -1
                          >
                            -
                          </button>
                          <span className="Cart-quantity-display">
                            {item.qt}
                          </span>
                          <button
                            className={`Cart-quantity-btn ${getDarkModeHover()}`}
                            onClick={() => handleQuantityChange(item.no, 1)} // 수량 +1
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {/* 아이템 삭제 버튼 */}
                        <button
                          className={`Cart-remove-btn ${getDarkMode()}`}
                          onClick={() => handleRemoveItem(item.no)} // 아이템 삭제
                          style={{ width: '50px' }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      align="center"
                      style={{ textAlign: 'center' }}
                    >
                      장바구니에 항목이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <div className={`Cart-summary ${getDarkMode()}`}>
            <p className={getDarkMode()}>
              총 {selectedItems.length}개의 항목이 선택되었습니다.
            </p>
            <p className={getDarkMode()}>
              총 결제 금액 : {totalAmount.toLocaleString()} 원
            </p>
            {/* 결제 버튼 */}
            <button
              className={`Cart-checkout-btn ${getDarkModeHover()}`}
              onClick={handleCheckout}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      {footer}
    </>
  );
}

export default UserCart;
