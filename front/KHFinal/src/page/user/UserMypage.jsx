import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useContext, useState, useRef, useEffect } from 'react';
import './css/UserMypage.css';
import { Context } from '../../Context';
import { Button, Container, Modal } from 'react-bootstrap';
import { getUserData, checkNickName, updateUserData } from './userApi';

function UserMypage() {
  const { getDarkMode, getDarkModeHover } = useContext(Context);
  const [selectedSection, setSelectedSection] = useState('info-view');
  const [emailError, setEmailError] = useState(false); // 이메일 오류 상태
  const [isEditable, setIsEditable] = useState(false); // Edit Mode
  const [userInfo, setUserInfo] = useState({});
  const [nicknameCheck, setNicknameCheck] = useState(false);  // 닉네임 중복 확인 상태
  const [formData, setFormData] = useState(userInfo); // 수정을 위한 form data.
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 회원 탈퇴 확인 모달
  const [deleteEmail, setDeleteEmail] = useState(''); // 탈퇴 시 이메일 상태
  const [deletePassword, setDeletePassword] = useState(''); // 탈퇴 시 비밀번호 상태

  /**userApi.js의 getUserData()함수를 호출하여
   * setUserInfo, setFormData에 data(data.user 회원 정보)를 저장. */
  useEffect(() => {
    const setData = async () => {
      const data = await getUserData();
      setUserInfo(data);
      setFormData(data);
      console.log(data);
    };
    setData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      return await getUserData();
    };
    console.log(getData());
    setUserInfo(getData());
  }, []);

  // 아이디 input에 대한 참조 추가
  const idInputRef = useRef(null);

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    const nickname = formData.nickname.trim();
    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (nickname.length < 3) {
      alert('닉네임은 최소 3글자 이상이어야 합니다.');
      return;
    }
    const flag = await checkNickName(nickname); // ✅ 닉네임 중복 확인 API 호출
    if (!flag) {
      setNicknameCheck(false); // ✅ 중복 확인 실패 시 제출 불가능 상태로 변경
      alert('이미 사용중인 닉네임입니다.');
    } else {
      alert('사용 가능한 닉네임입니다.');
      setNicknameCheck(true); // ✅ 중복 확인 성공 시 제출 가능 상태로 변경
    }
  };

  // // 이메일 입력창에 대한 참조 추가
  // const emailInputRef = useRef(null);

  // 메뉴 항목 클릭 시 호출되는 함수
  const showSection = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // // 이메일 확인 후 탈퇴 처리
  // const handleEmailSubmit = () => {
  //   if (emailInput !== userInfo.email) {
  //     alert('이메일이 맞지 않습니다. 다시 입력해주세요.');
  //     setEmailInput(''); // 입력 필드를 비우고 다시 입력을 요청
  //     setEmailError(true); // 이메일 오류 표시
  //   } else {
  //     const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?');
  //     if (confirmDelete) {
  //       setUserInfo({}); // 사용자 정보 초기화
  //       setEmailInput(''); // 이메일 입력 필드 초기화
  //       alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
  //       setSelectedSection('info-view'); // 내 정보 조회로 전환
  //     }
  //   }
  // };

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
  const handleSave = async () => {

    // 서버로 회원 정보 업데이트 요청.
    const updateResponse = await updateUserData(formData);

    // 서버 응답에 따른 처리.
    if (updateResponse.authenticated)
    {
      setUserInfo(formData); // 서버에서 수정된 데이터로 회원 정보 업데이트.
      alert('회원 정보 수정이 완료되었습니다.');
      toggleEdit(); // 수정 모드 종료.
    } else
    {
      alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
    }
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

  // 회원 탈퇴 확인 모달 열기
  const openDeleteModal = () => setShowDeleteModal(true);

  // 회원 탈퇴 확인 모달 닫기
  const closeDeleteModal = () => setShowDeleteModal(false);

  // 탈퇴 확인 모달에서 탈퇴 처리
  const handleDeleteAccount = (deleteEmail, deletePassword) => {
    if (deleteEmail === userInfo.email && deletePassword === userInfo.pwd) {
      const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');
      if (confirmDelete) {
        alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        setUserInfo({}); // 회원 정보 삭제
        closeDeleteModal();
        setSelectedSection('info-view'); // 내 정보 조회로 전환
      }
    } else {
      alert('입력한 정보가 맞지 않습니다. 다시 시도해주세요.');
    }
  };

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
                  className={selectedSection === 'account-delete' ? 'active' : ''}
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
            {selectedSection !== 'account-delete' && (
              <>
                <h3>내 정보</h3>
                <p className="MyPageMain-subtext">
                  내 프로필을 확인하고 관리합니다.
                </p>
              </>
            )}
            <div
              className={`MyPageMain-section ${
                selectedSection === 'info-view' ? 'active' : ''
              }`}
              id="info-view"
            >
              {/* 내 정보 카드 */}
              {Object.keys(userInfo).length > 0 ? (
              <div className="MyPageMain-card">
                <div
                  className={`MyPageMain-card-body ${getDarkMode()} form-container`}
                  >
                  <div className="MyPageMain-info-group">
                    {/* 사용자 정보 입력 필드 */}
                    {formData.provider === 'common' && (
                      <div>
                          {/* 수정 가능 항목 */}
                          <div className="MyPageMain-input-group">
                          <label
                            htmlFor="id"
                            className="MyPageMain-input-label"
                            >
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
                                name="pwd"
                                value={formData.pwd}
                                onChange={handleInputChange}
                                className="MyPageMain-input-field"
                              />
                            ) : (
                              <p>비밀번호</p>
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
                      </div> 
                      )}

                      {/* 닉네임 */}
                      <div className="MyPageMain-input-group">
                         <div className='w-100'>
                          <label htmlFor="nickname" className="MyPageMain-input-label">
                            닉네임
                          </label>
                          {isEditable ? (
                            <div className="MyPageMain-input-with-button">
                              <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                                className="MyPageMain-input-field w-75"
                              />
                              {!nicknameCheck ? (
                                <Button
                                  type="button"
                                  onClick={handleNicknameCheck}
                                  variant="none"
                                  className={`${getDarkModeHover()} ml-2 w-5`}
                                  style={{ marginTop: '0px' }}
                                  >
                                  중복확인
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  variant="none"
                                  className="ml-2 w-10"
                                  style={{
                                    marginTop: '0px',
                                    backgroundColor: 'gray', // 비활성화 스타일 추가
                                    color: 'white',
                                    cursor: 'default', // 마우스 커서를 기본으로 설정
                                  }}
                                  disabled
                                >
                                  확인완료
                                </Button>
                              )}
                            </div>
                          ) : (
                            <p>{formData.nickname}</p>
                          )}
                        </div>
                      </div>

                      {/* 일반 로그인 / API 로그인 공통 항목 */}
                      {/* 이름 */}
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

                      {/* 생년월일 */}
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
                            name="birth"
                            value={formData.birth}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                          />
                        ) : (
                          <p>{formData.birth}</p>
                        )}
                      </div>

{/* 성별 */}
<div className="MyPageMain-input-group">
                        <label
                          htmlFor="gender"
                          className="MyPageMain-input-label"
                        >
                          성별
                        </label>
                        {isEditable ? (
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            >
                            <option value="">선택 없음</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                          </select>
                        ) : (
                          <p>{formData.gender}</p>
                        )}
                      </div>
                      {/* 휴대폰 번호 */} 
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

                      {/* 지역 */}
                      <div className="MyPageMain-input-group">
                        <label
                          htmlFor="region"
                          className="MyPageMain-input-label"
                          >
                          지역
                        </label>
                        {isEditable ? (
                          <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            className="MyPageMain-input-field"
                            >
                            <option value="">선택 없음</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="강원">강원</option>
                            <option value="충북">충북</option>
                            <option value="충남">충남</option>
                            <option value="전북">전북</option>
                            <option value="전남">전남</option>
                            <option value="경북">경북</option>
                            <option value="경남">경남</option>
                            <option value="제주">제주</option>
                          </select>
                        ) : (
                          <p>{formData.region}</p>
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
                      className={`${getDarkModeHover()} ${
                        isEditable ? 'w-50' : 'w-100'
                      }`}
                      onClick={isEditable ? handleSave : toggleEdit}
                    >
                      {isEditable ? '완료' : '수정하기'}
                    </Button>
                    {isEditable && (
                      <Button
                        variant="none"
                        className={`${getDarkModeHover()} w-50`}
                        onClick={handleCancel}
                      >
                        취소
                      </Button>
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
                <p>◦ 회원 탈퇴 시, 예매 및 결제 관련 기능을 이용하실 수 없게 되며, 탈퇴 후에는 모든 계정 정보와 활동 기록이 삭제됩니다.</p>
                <p>◦ 탈퇴 진행을 계속 원하실 경우, 아래 탈퇴하기 버튼을 눌러주세요. 그 후 안내에 따라 절차를 진행하실 수 있습니다.</p>
                <br></br>
                <Button
                  variant="none"
                  className={`${getDarkModeHover()} w-100`}
                  onClick={openDeleteModal}
                >
                  탈퇴하기
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* 탈퇴 확인 모달 */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>이메일</label>
            <input
              type="email"
              className="form-control"
              placeholder="이메일을 입력하세요"
            />
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleDeleteAccount(deleteEmail, deletePassword)}
          >
            확인
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default UserMypage;