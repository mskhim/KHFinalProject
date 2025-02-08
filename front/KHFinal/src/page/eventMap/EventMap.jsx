import { Header, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import EventMapKorea from './include/EventMapKorea';
import EventMapList from './include/EventMapList';
import { useEffect, useState } from 'react';

const EventMap = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 이벤트 데이터를 API나 로컬에서 가져오는 로직 추가
    // 예시로 임시 데이터 사용
    setEvents([
      {
        no: 1,
        title: '서울 불꽃축제',
        period: '2024.10.05',
        img: 'https://picsum.photos/400/250?random=1',
        popularity: 5,
        LATITUDE: 37.523456,
        LONGITUDE: 126.923789,
      },
      {
        no: 2,
        title: '부산 국제 영화제',
        period: '2024.09.01',
        img: 'https://picsum.photos/400/250?random=2',
        popularity: 8,
        LATITUDE: 35.171165,
        LONGITUDE: 129.127188,
      },
      {
        no: 3,
        title: '제주 감귤 축제',
        period: '2024.11.15',
        img: 'https://picsum.photos/400/250?random=3',
        popularity: 3,
        LATITUDE: 33.287986,
        LONGITUDE: 126.607553,
      },
      {
        no: 4,
        title: '춘천 마임 축제',
        period: '2024.06.01',
        img: 'https://picsum.photos/400/250?random=4',
        popularity: 7,
        LATITUDE: 37.872957,
        LONGITUDE: 127.700242,
      },
      {
        no: 5,
        title: '안동 국제 탈춤 페스티벌',
        period: '2024.10.10',
        img: 'https://picsum.photos/400/250?random=5',
        popularity: 6,
        LATITUDE: 36.560413,
        LONGITUDE: 128.731783,
      },
      {
        no: 6,
        title: '진주 남강 유등축제',
        period: '2024.10.03',
        img: 'https://picsum.photos/400/250?random=6',
        popularity: 9,
        LATITUDE: 35.189177,
        LONGITUDE: 128.077957,
      },
      {
        no: 7,
        title: '전주 한옥마을 축제',
        period: '2024.05.20',
        img: 'https://picsum.photos/400/250?random=7',
        popularity: 4,
        LATITUDE: 35.818694,
        LONGITUDE: 127.150616,
      },
      {
        no: 8,
        title: '강릉 단오제',
        period: '2024.06.10',
        img: 'https://picsum.photos/400/250?random=8',
        popularity: 10,
        LATITUDE: 37.748377,
        LONGITUDE: 128.894795,
      },
      {
        no: 9,
        title: '대구 치맥 페스티벌',
        period: '2024.07.24',
        img: 'https://picsum.photos/400/250?random=9',
        popularity: 2,
        LATITUDE: 35.848571,
        LONGITUDE: 128.558209,
      },
      // 실제 API 데이터로 대체 가능
    ]);
  }, []);

  return (
    <>
      <Header page="map" />
      <Container>
        <EventMapKorea events={events}/>
        <EventMapList events={events}/>
      </Container>
      <Footer />
    </>
  );
};

export default EventMap;
