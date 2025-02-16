import { useEffect, useRef, useContext } from 'react';
import { Context } from '../../../Context';

const EventMapSection = ({ LATITUDE, LONGITUDE, ZOOM, eventList }) => {
  const mapRef = useRef(null); // 기존 지도 저장
  const infoWindowRef = useRef(null); // 인포윈도우 저장
  const { darkMode } = useContext(Context); // 다크모드 상태 가져오기

  useEffect(() => {
    const clientId = import.meta.env.VITE_APP_NAVER_MAPS_CLIENT_ID;
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        if (!mapRef.current) {
          // ✅ 최초 지도 생성
          mapRef.current = new window.naver.maps.Map('naver-map', {
            center: new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
            zoom: ZOOM ?? 9,
            disableDoubleClickZoom: false, // 더블 클릭 줌 비활성화
            scrollWheel: true, // 마우스 휠 줌 비활성화
          });

          // ✅ 인포윈도우 생성 (마커 클릭 시 표시할 정보창)
          infoWindowRef.current = new window.naver.maps.InfoWindow({
            content: '', // 초기에는 비어 있음
            disableAnchor: false,
            borderWidth: 1,
            backgroundColor: '#ffffff',
          });
        } else {
          // 먼저 줌을 변경
          mapRef.current.setZoom(ZOOM ?? 9, true);

          // 줌 변경 후 일정 시간이 지난 뒤에 지도 이동
          setTimeout(() => {
            mapRef.current.panTo(
              new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
              {
                duration: 700, // 이동 애니메이션
              }
            );
          }, 50); // 줌을 변경한 후 700ms 뒤에 이동
        }
        // 기존 마커 삭제 후 새 마커 생성
        mapRef.current.markers?.forEach((marker) => marker.setMap(null)); // 기존 마커 삭제
        mapRef.current.markers = eventList.map((event) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              Number(event.latitude),
              Number(event.longitude)
            ),
            map: mapRef.current,
            title: event.name,
          });

          // 마커 클릭 시 인포윈도우 표시
          if (mapRef.current && infoWindowRef.current) {
            window.naver.maps.Event.addListener(marker, 'click', () => {
              infoWindowRef.current.setContent(`
                <div style="width: 220px; text-align: center; padding: 10px; 
                      background-color: ${darkMode ? '#1e1e1e' : '#ffffff'}; 
                      color: ${darkMode ? '#ffffff' : '#000000'};
                      border-radius: 10px;
                      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);">
            <img src="${event.thumbUrl}" alt="${event.name}" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            <h4 style="margin: 10px 0; font-size: 16px;">${event.name}</h4>
            <a href="/eventRead/${event.no}" 
               style="display: block; background-color: ${
                 darkMode ? '#f39c12' : '#007bff'
               };
                      color: #fff; padding: 8px; border-radius: 5px; text-decoration: none;
                      font-size: 14px;">
              자세히 보기 
            </a>
          </div>
            `);
              infoWindowRef.current.open(mapRef.current, marker);
            });
          }

          return marker;
        });
      }
    };
    document.head.appendChild(script);
  }, [LATITUDE, LONGITUDE, ZOOM, eventList]);

  return (
    <div className="map-section">
      <div id="naver-map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default EventMapSection;
