import { useEffect } from 'react';

const MapSection = ({ LATITUDE, LONGITUDE }) => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_APP_NAVER_MAPS_CLIENT_ID;

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        const map = new window.naver.maps.Map('naver-map', {
          center: new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
          zoom: 15,
        });

        // 📍 마커 추가
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(LATITUDE, LONGITUDE),
          map: map,
        });
      }
    };
    document.head.appendChild(script);
  }, [LATITUDE, LONGITUDE]);

  return (
    <div className="map-section">
      <div id="naver-map" style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
};

export default MapSection;
