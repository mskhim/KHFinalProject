import { useEffect, useRef } from 'react';
import mapMark from '../../../assets/mapMark.png'

const EventMapSection = ({ LATITUDE, LONGITUDE, ZOOM, events }) => {
  const mapRef = useRef(null); // 기존 지도 저장
  const infoWindowRef = useRef(null); // 인포윈도우 저장

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
          });

          // ✅ 인포윈도우 생성 (마커 클릭 시 표시할 정보창)
          infoWindowRef.current = new window.naver.maps.InfoWindow({
            content: "", // 초기에는 비어 있음
            disableAnchor: false,
            borderWidth: 1,
            backgroundColor: "#ffffff",
          });
        } else {
         // 먼저 줌을 변경
        mapRef.current.setZoom(ZOOM ?? 9, true);

        // 줌 변경 후 일정 시간이 지난 뒤에 지도 이동
        setTimeout(() => {
          mapRef.current.panTo(new window.naver.maps.LatLng(LATITUDE, LONGITUDE), {
            duration: 700, // 이동 애니메이션
          });
        }, 1000); // 줌을 변경한 후 700ms 뒤에 이동
        }


        // 기존 마커 삭제 후 새 마커 생성
      mapRef.current.markers?.forEach((marker) => marker.setMap(null)); // 기존 마커 삭제
      mapRef.current.markers = events.map((event) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(event.LATITUDE, event.LONGITUDE),
          map: mapRef.current,
          title: event.title,
          icon: {
            url: mapMark,  // 사용자 지정 이미지 URL
            size: new window.naver.maps.Size(70, 70),    // 마커 크기
            anchor: new window.naver.maps.Point(16, 32), // 마커 앵커 위치 (중앙 하단)
          },
        });

        // 마커 클릭 시 인포윈도우 표시
        if (mapRef.current && infoWindowRef.current) {
          window.naver.maps.Event.addListener(marker, "click", () => {
            infoWindowRef.current.setContent(`
              <div style="padding:10px; min-width:200px; text-align:center;">
                <h4 style="margin:0;">${event.title}</h4>
                <p style="margin:5px 0;">${event.description ?? "설명 없음"}</p>
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
  }, [LATITUDE, LONGITUDE, ZOOM, events]);

  return (
    <div className="map-section">
      <div id="naver-map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default EventMapSection;
