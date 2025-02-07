import { useEffect } from 'react';

const EventMapSection = ({ LATITUDE, LONGITUDE, ZOOM, events }) => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_APP_NAVER_MAPS_CLIENT_ID;

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        const map = new window.naver.maps.Map('naver-map', {
          center: new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
          zoom: ZOOM ?? 9, // 지역별 줌 값 반영
        });

        // ✅ 모든 이벤트 마커 추가
        events.forEach((event) => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              event.LATITUDE,
              event.LONGITUDE
            ),
            map: map,
            title: event.title, // 마커 제목
          });
        });
      }
    };
    document.head.appendChild(script);
  }, [LATITUDE, LONGITUDE, ZOOM, events]);

  return (
    <div className="map-section">
      <div id="naver-map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default EventMapSection;
