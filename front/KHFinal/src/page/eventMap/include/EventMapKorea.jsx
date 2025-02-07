import React, { useState } from 'react';
import EventMapSection from './EventMapSection';

export default function EventMapKorea({ events }) {
  // 8도 지역 좌표 데이터
  const regions = [
    { name: '서울', LATITUDE: 37.5665, LONGITUDE: 126.978, zoom: 11 },
    { name: '경기', LATITUDE: 37.5417, LONGITUDE: 127.2069, zoom: 9 },
    { name: '강원', LATITUDE: 37.8228, LONGITUDE: 128.1555, zoom: 9 },
    { name: '충북', LATITUDE: 36.6357, LONGITUDE: 127.4912, zoom: 9 },
    { name: '충남', LATITUDE: 36.6588, LONGITUDE: 126.6728, zoom: 9 },
    { name: '전북', LATITUDE: 35.7175, LONGITUDE: 127.153, zoom: 9 },
    { name: '전남', LATITUDE: 34.8679, LONGITUDE: 126.991, zoom: 9 },
    { name: '경북', LATITUDE: 36.4919, LONGITUDE: 128.8889, zoom: 9 },
    { name: '경남', LATITUDE: 35.4606, LONGITUDE: 128.2132, zoom: 9 },
  ];

  const [clickEvent, setClickEvent] = useState(regions[0]);
  return (
    <>
      {/* 지역 선택 버튼 */}
      <div className="button-container">
        {regions.map((region) => (
          <button
            key={region.name}
            onClick={() => setClickEvent(region)}
            className="region-button"
          >
            {region.name}
          </button>
        ))}
      </div>
      <EventMapSection
        LATITUDE={clickEvent.LATITUDE}
        LONGITUDE={clickEvent.LONGITUDE}
        ZOOM={clickEvent.zoom} // 지역별 줌 값 전달
        events={events} //이벤트 목록 전달
      />
    </>
  );
}
