import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Context } from '../../../Context'; // ✅ 다크모드 Context 사용
import './EventListSearchWrap.css';
import { ButtonDarkMode } from '../../../components/ui';
const EventListSearchWrap = ({ onSearch }) => {
  const { getDarkMode, getDarkModeHover } = useContext(Context); // ✅ 다크모드 여부
  const [searchDate, setSearchDate] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [regions, setRegions] = useState([]); // ✅ 지역 리스트 (목업 데이터)

  // ✅ 지역 리스트 (목업 데이터) - 나중에 API 연동 시 이 부분을 대체
  useEffect(() => {
    const fetchMockRegions = async () => {
      const mockData = [
        { id: 1, name: '서울' },
        { id: 2, name: '부산' },
        { id: 3, name: '대구' },
        { id: 4, name: '인천' },
        { id: 5, name: '광주' },
        { id: 6, name: '대전' },
        { id: 7, name: '울산' },
        { id: 8, name: '경기' },
        { id: 9, name: '강원' },
        { id: 10, name: '충북' },
        { id: 11, name: '충남' },
        { id: 12, name: '전북' },
        { id: 13, name: '전남' },
        { id: 14, name: '경북' },
        { id: 15, name: '경남' },
        { id: 16, name: '제주' },
      ];
      setRegions(mockData);
    };

    fetchMockRegions();
  }, []);

  // ✅ 검색 버튼 클릭
  const handleSearch = () => {
    if (isSearching) {
      setSearchDate('');
      setSearchRegion('');
      setSearchName('');
      setIsSearching(false);
      onSearch(null);
    } else {
      const searchParams = {
        date: searchDate,
        region: searchRegion,
        name: searchName,
      };
      setIsSearching(true);
      onSearch(searchParams);
    }
  };

  return (
    <Container
      className={`EventListSearchWrap-search-bar py-3 px-4 rounded shadow-none `}
    >
      <Row className="align-items-center justify-content-center">
        {/* ✅ 날짜 입력 */}
        <Col
          xs={12}
          md={3}
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
                {region.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* ✅ 이름 입력 */}
        <Col
          xs={12}
          md={3}
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
        <Col xs={12} md="auto">
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
