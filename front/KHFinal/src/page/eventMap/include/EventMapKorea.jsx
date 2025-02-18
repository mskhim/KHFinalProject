import React, { useState, useContext } from 'react';
import EventMapSection from './EventMapSection';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { Context } from '../../../Context';
import './css/EventMapKorea.css';
export default function EventMapKorea({
  sortOption,
  setSortOption,
  eventList,
  setEventList,
}) {
  const { darkMode } = useContext(Context);
  // 8도 지역 좌표 데이터
  const regions = [
    { name: '서울', LATITUDE: 37.5665, LONGITUDE: 126.978, zoom: 11 },
    { name: '경기', LATITUDE: 37.5417, LONGITUDE: 127.2069, zoom: 9 },
    { name: '강원', LATITUDE: 37.8228, LONGITUDE: 128.1555, zoom: 9 },
    { name: '충청북도', LATITUDE: 36.6357, LONGITUDE: 127.4912, zoom: 9 },
    { name: '충청남도', LATITUDE: 36.5588, LONGITUDE: 126.6728, zoom: 9 },
    { name: '전북', LATITUDE: 35.7175, LONGITUDE: 127.153, zoom: 9 },
    { name: '전남', LATITUDE: 34.8679, LONGITUDE: 126.991, zoom: 9 },
    { name: '경상북도', LATITUDE: 36.4919, LONGITUDE: 128.8889, zoom: 9 },
    { name: '경상남도', LATITUDE: 35.4606, LONGITUDE: 128.2132, zoom: 9 },
    { name: '제주', LATITUDE: 33.369849, LONGITUDE: 126.52912, zoom: 10 },
  ];

  const [clickEvent, setClickEvent] = useState(regions[0]);
  const hadleClickEvent = (region) => {
    setClickEvent(region);
    setSortOption({
      ...sortOption,
      region: region.name,
      page: 1,
      toggle: !sortOption.toggle,
    });
  };
  return (
    <>
      {/* 지역 선택 버튼 */}
      <div className="EventMapKorea-buttons EventMapKorea-button-group">
        {regions.map((region) => (
          <Button
            variant={darkMode ? 'outline-light' : 'outline-dark'}
            size="lg"
            key={region.name}
            onClick={() => hadleClickEvent(region)}
            className={`EventMapKorea-button-individual ${
              clickEvent.name === region.name ? 'active' : ''
            }`}
          >
            {region.name}
          </Button>
        ))}
      </div>
      <div className="EventMapKorea-mapSection">
        <EventMapSection
          LATITUDE={clickEvent.LATITUDE}
          LONGITUDE={clickEvent.LONGITUDE}
          ZOOM={clickEvent.zoom} // 지역별 줌 값 전달
          eventList={eventList}
        />
      </div>
    </>
  );
}
