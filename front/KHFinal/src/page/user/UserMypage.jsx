import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useContext, useState, useRef, useEffect } from 'react';
import './css/UserMypage.css';
import { Context } from '../../Context';
import { Button, Container } from 'react-bootstrap';

function UserMypage() {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const [selectedSection, setSelectedSection] = useState('info-view');
  const [emailInput, setEmailInput] = useState(''); // 탈퇴 시 이메일 입력 상태
  const [emailError, setEmailError] = useState(false); // 이메일 오류 상태
  const [isEditable, setIsEditable] = useState(false); // Edit Mode
  const [userInfo, setUserInfo] = useState({
    id: 'honggildong123',
    password: '********',
    email: 'honggildong@naver.com',
    name: '홍길동',
    birthDate: '1990-01-01',
    gender: '남성',
    phone: '010-1234-5678',
    regionCode: '서울',
  });

  const [formData, setFormData] = useState(userInfo); // Copy of userInfo for edit

  // 아이디 input에 대한 참조 추가
  const idInputRef = useRef(null);

  // 이메일 입력창에 대한 참조 추가
  const emailInputRef = useRef(null);

  // 메뉴 항목 클릭 시 호출되는 함수
  const showSection = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // 이메일 확인 후 탈퇴 처리
  const handleEmailSubmit = () => {
    if (emailInput !== userInfo.email) {
      alert('이메일이 맞지 않습니다. 다시 입력해주세요.');
      setEmailInput(''); // 입력 필드를 비우고 다시 입력을 요청
      setEmailError(true); // 이메일 오류 표시
    } else {
      const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?');
      if (confirmDelete) {
        setUserInfo({}); // 사용자 정보 초기화
        setEmailInput(''); // 이메일 입력 필드 초기화
        alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        setSelectedSection('info-view'); // 내 정보 조회로 전환
      }
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save changes after editing
  const handleSave = () => {
    setUserInfo(formData); // Save updated data
    alert('수정이 완료되었습니다.');
    toggleEdit(); // Disable editing
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(userInfo); // Restore original data
    toggleEdit(); // Disable editing
  };

  // 아이디 입력창에 자동으로 포커스를 맞추기 위한 useEffect
  useEffect(() => {
    if (isEditable) {
      idInputRef.current?.focus(); // 수정 모드일 때 아이디 input에 focus
    }
  }, [isEditable]); // isEditable 상태가 변할 때마다 실행

  // 이메일 입력창에 자동으로 포커스를 맞추기 위한 useEffect
  useEffect(() => {
    if (selectedSection === 'account-delete') {
      emailInputRef.current?.focus(); // 회원 탈퇴 페이지일 때 이메일 input에 focus
    }
  }, [selectedSection]); // selectedSection 상태가 변경될 때마다 실행

  return (
    <>
      <Header />
      <div className="MyPageMain-container">
        <header className="MyPageMain-header">
          <h1>마이페이지</h1>
        </header>

        <div className="MyPageMain-wrapper">
          {/* 왼쪽 메뉴 */}
          <div className={`MyPageMain-menu ${getDarkMode()}`}>
            <ul>
              <li>
                <span
                  className={selectedSection === 'info-view' ? 'active' : ''}
                  onClick={() => showSection('info-view')}
                >
                  내 정보 조회
                </span>
              </li>
              <li>
                <span
                  className={
                    selectedSection === 'account-delete' ? 'active' : ''
                  }
                  onClick={() => showSection('account-delete')}
                >
                  회원 탈퇴
                </span>
              </li>
            </ul>
          </div>

          {/* 오른쪽 콘텐츠 */}
          <Container className="MyPageMain-content w-50">
            {/* 내 정보 조회 섹션 */}
            <div
              className={`MyPageMain-section ${
                selectedSection === 'info-view' ? 'active' : ''
              }`}
              id="info-view"
            >
              {/* 아이디 및 비밀번호 카드 */}
              {Object.keys(userInfo).length > 0 ? (
                <div className="MyPageMain-card pb-3">
                  <div className="MyPageMain-card-body">
                    <div className="MyPageMain-info-group">
                      <div className="MyPageMain-input-group">
                        <label htmlFor="id" className="MyPageMain-input-label">
                          아이디
                        </label>
                        {isEditable ? (
                          <input
                            ref={idInputRef} // 아이디 input에 ref 연결
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.id}</p>
                        )}
                      </div>
                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="password"
                          className="MyPageMain-input-label"
                        >
                          비밀번호
                        </label>
                        {isEditable ? (
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.password}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="email"
                          className="MyPageMain-input-label"
                        >
                          이메일
                        </label>
                        {isEditable ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.email}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="name"
                          className="MyPageMain-input-label"
                        >
                          이름
                        </label>
                        {isEditable ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.name}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="birthDate"
                          className="MyPageMain-input-label"
                        >
                          생년월일
                        </label>
                        {isEditable ? (
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.birthDate}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="gender"
                          className="MyPageMain-input-label"
                        >
                          성별
                        </label>
                        {isEditable ? (
                          <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.gender}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="phone"
                          className="MyPageMain-input-label"
                        >
                          휴대폰 번호
                        </label>
                        {isEditable ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.phone}</p>
                        )}
                      </div>

                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="regionCode"
                          className="MyPageMain-input-label"
                        >
                          지역
                        </label>
                        {isEditable ? (
                          <input
                            type="text"
                            name="regionCode"
                            value={formData.regionCode}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.regionCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="MyPageMain-button-container">
                {Object.keys(userInfo).length > 0 ? (
                  <>
                    <Button
                      variant="none"
                      className={`${getDarkModeHover()}  ${
                        isEditable ? 'w-50' : 'w-100'
                      }`}
                      onClick={isEditable ? handleSave : toggleEdit}
                    >
                      {isEditable ? '완료' : '수정하기'}
                    </Button>
                    {isEditable && (
                      <button
                        className="MyPageMain-button w-50"
                        onClick={handleCancel}
                      >
                        취소
                      </button>
                    )}
                  </>
                ) : (
                  <p>조회할 정보가 없습니다.</p>
                )}
              </div>
            </div>

            {/* 회원 탈퇴 섹션 */}
            <div
              className={`MyPageMain-section ${
                selectedSection === 'account-delete' ? 'active' : ''
              }`}
              id="account-delete"
            >
              <h2>회원 탈퇴</h2>
              <div className="MyPageMain-account-delete-container">
                <div className="MyPageMain-input-with-button">
                  <label htmlFor="email-input">탈퇴를 위한 이메일 입력</label>
                  <div className="d-flex align-items-center mt-3">
                    <input
                      ref={emailInputRef} // 이메일 input에 ref 연결
                      id="email-input"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="MyPageMain-input-field border border-1 mt-0 me-3"
                    />
                    <button
                      className="MyPageMain-button"
                      onClick={handleEmailSubmit}
                    >
                      탈퇴하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserMypage;
