import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useContext, useState } from 'react';
import './UserMypage.css';
import { Context } from "../../Context";

function UserMypage() {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const [selectedSection, setSelectedSection] = useState('info-view');
  const [emailInput, setEmailInput] = useState('');  // 탈퇴 시 이메일 입력 상태
  const [isEmailInputVisible, setEmailInputVisible] = useState(false); // 이메일 입력창 표시 여부

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    birthdate: '1990-01-01',
    gender: '남성',
    email: 'hong@domain.com',
    phone: '010-1234-5678',
    regionCode: '서울',
    profileImage: '/img/1010.jpg', // 임시 프로필 이미지
  });

  // 수정된 정보 상태
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  // 메뉴 항목 클릭 시 호출되는 함수
  const showSection = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // 정보 수정 완료 시 호출되는 함수
  const handleEditSubmit = () => {
    const confirmEdit = window.confirm('정보를 수정하시겠습니까?');
    if (confirmEdit) {
      // 수정된 정보 적용
      setUserInfo({ ...editedInfo });
      alert('정보 수정이 완료되었습니다.');
      // 내 정보 조회로 전환
      setSelectedSection('info-view');
    }
  };

  // 회원 탈퇴 버튼 클릭 시 이메일 입력 창 표시
  const handleAccountDelete = () => {
    setEmailInputVisible(true);
  };

  // 이메일 확인 후 탈퇴 처리
  const handleEmailSubmit = () => {
    if (emailInput !== userInfo.email) {
      alert('이메일 정보가 맞지 않습니다. 다시 입력해주세요.');
      setEmailInput('');  // 입력 필드를 비우고 다시 입력을 요청
      setEmailInputVisible(false);  // 이메일 입력창을 숨김
      setSelectedSection('account-delete');  // 탈퇴 화면으로 돌아가기
    } else {
      const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?');
      if (confirmDelete) {
        // 내 정보 삭제
        setUserInfo({});
        alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        setSelectedSection('info-view'); // 내 정보 조회로 전환
      }
    }
  };

  return (<><Header />
    <div className="MyPageMain-container">
      <header className="MyPageMain-header">
        <h1>마이페이지</h1>
      </header>

      <div className="MyPageMain-wrapper">
        {/* 왼쪽 메뉴 */}
        <div className={`MyPageMain-menu ${getDarkMode()}`}>
          <ul>
            <li>
              <span className={selectedSection === 'info-view' ? 'active' : ''} onClick={() => showSection('info-view')}>내 정보 조회</span>
            </li>
            <li>
              <span className={selectedSection === 'info-edit' ? 'active' : ''} onClick={() => showSection('info-edit')}>내 정보 수정</span>
            </li>
            <li>
              <span className={selectedSection === 'account-delete' ? 'active' : ''} onClick={() => showSection('account-delete')}>회원 탈퇴</span>
            </li>
          </ul>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="MyPageMain-content">
          {/* 내 정보 조회 섹션 */}
          <div className={`MyPageMain-section ${selectedSection === 'info-view' ? 'active' : ''}`} id="info-view">
            <h2>내 정보 조회</h2>
            <div className="MyPageMain-profile-info">
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>생년월일:</strong> {userInfo.birthdate}</p>
              <p><strong>성별:</strong> {userInfo.gender}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>전화번호:</strong> {userInfo.phone}</p>
              <p><strong>지역코드:</strong> {userInfo.regionCode}</p>
            </div>
            <div className="MyPageMain-button-container">
              <button className="MyPageMain-button" onClick={() => showSection('info-edit')}>정보 수정</button>
            </div>
          </div>

          {/* 내 정보 수정 섹션 */}
          <div className={`MyPageMain-section ${selectedSection === 'info-edit' ? 'active' : ''}`} id="info-edit">
            <h2>내 정보 수정</h2>
            <div className="MyPageMain-profile-info">
              <div>
                <label>이름:</label>
                <p>{userInfo.name}</p>
              </div>
              <div>
                <label>생년월일:</label>
                <p>{userInfo.birthdate}</p>
              </div>
              <div>
                <label>성별:</label>
                <p>{userInfo.gender}</p>
              </div>
              <div>
                <label>이메일:</label>
                <input className="MyPageMain-input"
                  type="email"
                  value={editedInfo.email}
                  onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label>전화번호:</label>
                <input className="MyPageMain-input"
                  type="tel"
                  value={editedInfo.phone}
                  onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                />
              </div>
              <div>
                <label>지역코드:</label>
                <input className="MyPageMain-input"
                  type="text"
                  value={editedInfo.regionCode}
                  onChange={(e) => setEditedInfo({ ...editedInfo, regionCode: e.target.value })}
                />
              </div>
            </div>
            <div className="MyPageMain-button-container">
              <button className="MyPageMain-button" onClick={handleEditSubmit}>수정 완료</button>
            </div>
          </div>

          {/* 회원 탈퇴 섹션 */}
          <div className={`MyPageMain-section ${selectedSection === 'account-delete' ? 'active' : ''}`} id="account-delete">
            <h2>회원 탈퇴</h2>
            <div className="MyPageMain-profile-info">
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>전화번호:</strong> {userInfo.phone}</p>
            </div>
            {isEmailInputVisible ? (
              <div>
                <label>이메일을 입력하세요:</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <div className="MyPageMain-button-container">
                  <button className="MyPageMain-button" onClick={handleEmailSubmit}>탈퇴하기</button>
                </div>
              </div>
            ) : (
              <div className="MyPageMain-button-container">
                <button className="MyPageMain-button" onClick={handleAccountDelete}>탈퇴하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>);
}

export default UserMypage;
