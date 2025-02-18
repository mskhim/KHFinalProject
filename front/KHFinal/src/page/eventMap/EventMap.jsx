import { Container } from 'react-bootstrap';
import { Header, Footer } from '../../components';

import EventMapKorea from './include/EventMapKorea';
import EventListVIewWrap from './include/EventListVIewWrap';
import { useEffect, useState } from 'react';

const EventMap = () => {
  const [eventList, setEventList] = useState([]);
  //  정렬 상태
  const [sortOption, setSortOption] = useState({
    page: 1,
    sort: 'startDate',
    search: null,
    date: null,
    region: '서울',
    toggle: false,
  });

  return (
    <>
      <Header page="map" />
      <Container className="EventMapKorea-container px-4 mx-auto ">
        <EventMapKorea
          sortOption={sortOption}
          setSortOption={setSortOption}
          eventList={eventList}
          setEventList={setEventList}
        />
        <EventListVIewWrap
          sortOption={sortOption}
          setSortOption={setSortOption}
          eventList={eventList}
          setEventList={setEventList}
        />
      </Container>
      <Footer />
    </>
  );
};

export default EventMap;
