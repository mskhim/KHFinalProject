import { useEffect, useRef } from 'react';


const EventMapSection = ({ LATITUDE, LONGITUDE, ZOOM, events}) => {
  const mapRef = useRef(null); // 기존 지도 저장
 // ✅ 스프링부트에서 가져오는 9개 데이터 (현재 페이지 기준)
 
  useEffect(() => {
    const clientId = import.meta.env.VITE_APP_NAVER_MAPS_CLIENT_ID;

    // 네이버 맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        if (!mapRef.current) {
          // ✅ 최초 지도 생성
          mapRef.current = new window.naver.maps.Map('naver-map', {
            center: new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
            zoom: ZOOM ?? 9, // 기본 줌 설정
          });
        } else {
          // ✅ 기존 지도 유지하면서 부드럽게 이동 (줌 포함)
          mapRef.current.morph(
            new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
            ZOOM ?? 9
          );
        }

        // ✅ 모든 이벤트 마커 추가 (기존 마커 초기화 후 다시 그리기)
        const map = mapRef.current;
        mapRef.current.markers?.forEach((marker) => marker.setMap(null)); // 기존 마커 삭제
        mapRef.current.markers = events.map(
          (event) =>
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                event.LATITUDE,
                event.LONGITUDE
              ),
              map: map,
              title: event.title,
            })
        );
      }
    };
    document.head.appendChild(script);
  }, [LATITUDE, LONGITUDE, ZOOM, events]); // 위치나 이벤트 변경 시만 실행

  return (
    <div className="map-section">
      <div id="naver-map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default EventMapSection;
