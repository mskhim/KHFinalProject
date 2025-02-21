import React, { useState, useContext, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Context } from '../../../Context'; // ✅ 다크모드 Context 사용
import './css/EventListSearchWrap.css';
import { ButtonDarkMode } from '../../../components/ui';

const EventListSearchWrap = ({ setSortOption, sortOption }) => {
  const { getDarkMode, getDarkModeHover } = useContext(Context); // ✅ 다크모드 여부
  const [searchDate, setSearchDate] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const isFirstRender = useRef(true); // ✅ 처음 렌더링 여부를 저장하는 ref
  const [regions, setRegions] = useState([
    { id: 1, name: '서울', value: '서울' },
    { id: 2, name: '부산', value: '부산' },
    { id: 3, name: '대구', value: '대구' },
    { id: 4, name: '인천', value: '인천' },
    { id: 5, name: '광주', value: '광주' },
    { id: 6, name: '대전', value: '대전' },
    { id: 7, name: '울산', value: '울산' },
    { id: 8, name: '경기', value: '경기도' },
    { id: 9, name: '강원', value: '강원도' },
    { id: 10, name: '충청북도', value: '충청북도' },
    { id: 11, name: '충청남도', value: '충청남도' },
    { id: 12, name: '전북', value: '전라북도' },
    { id: 13, name: '전남', value: '전라남도' },
    { id: 14, name: '경상북도', value: '경상북도' },
    { id: 15, name: '경상남도', value: '경상남도' },
    { id: 16, name: '제주', value: '제주도' },
  ]); // ✅ 지역 리스트 (목업 데이터)

  // ✅ 검색 버튼 클릭
  const handleSearch = () => {
    setIsSearching(!isSearching);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isSearching) {
      setSearchDate('');
      setSearchRegion('');
      setSearchName('');
      setSortOption(() => ({
        page: 1,
        sort: 'subDate',
        search: null,
        date: null,
        region: null,
        toggle: !sortOption.toggle,
      }));
    } else {
      setSortOption((prev) => ({
        ...prev, // ✅ 기존 상태 유지
        search: searchName,
        date: searchDate,
        region: searchRegion,
        toggle: !prev.toggle,
      }));
    }
  }, [isSearching]);

  return (
    <Container
      className={`EventListSearchWrap-search-bar py-3 px-1 rounded shadow-none `}
    >
      <Row className="align-items-center justify-content-center">
        {/* ✅ 날짜 입력 */}
        <Col
          xs={12}
          md={4}
          className={`mb-2 mb-md-0 border-0 ${getDarkMode()}`}
        >
          <Form.Control
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className={`EventListSearchWrap-form-input border-1 ${getDarkMode()} `}
          />
        </Col>

        {/* ✅ 지역 선택 (목업 데이터 활용) */}
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <Form.Select
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
            className={`EventListSearchWrap-form-input ${getDarkMode()}`}
          >
            <option value="">전체 지역</option>
            {regions.map((region) => (
              <option key={region.id} value={region.name}>
                {region.value}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* ✅ 이름 입력 */}
        <Col
          xs={12}
          md={4}
          className={`mb-2 mb-md-0 border-0 ${getDarkMode()}`}
        >
          <Form.Control
            type="text"
            placeholder="축제 이름 검색"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={`EventListSearchWrap-form-input ${getDarkMode()}`}
          />
        </Col>

        {/* ✅ 검색 버튼 */}
        <Col xs={12} md={'auto'}>
          <ButtonDarkMode
            text={isSearching ? '검색 취소' : '검색'}
            onClick={handleSearch}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EventListSearchWrap;
