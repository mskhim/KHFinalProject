import { Header, Footer } from '../../components';
import EventListVisualWrap from './include/EventListVisualWrap';
import EventListSearchWrap from './include/EventListSearchWrap';
import EventListViewWrap from './include/EventListViewWrap';
import { useEffect, useState } from 'react';
import exApi from '../../api/ExceptionApi';
import { Container } from 'react-bootstrap';

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  //  정렬 상태
  const [sortOption, setSortOption] = useState({
    page: 1,
    sort: 'startDate',
    search: null,
    date: null,
    region: null,
    toggle: false,
  });
  return (
    <>
      <Header page="list" />
      <br />
      <EventListSearchWrap
        setSortOption={setSortOption}
        sortOption={sortOption}
      />
      <EventListVisualWrap eventList={eventList} />
      <br />
      <EventListViewWrap
        sortOption={sortOption}
        setSortOption={setSortOption}
        eventList={eventList}
        setEventList={setEventList}
      />
      <Footer />
    </>
  );
};

export default EventList;
