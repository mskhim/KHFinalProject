import { Header, Footer } from '../../components';
import EventListVisualWrap from './include/EventListVisualWrap';
import EventListSearchWrap from './include/EventListSearchWrap';
import EventListViewWrap from './include/EventListVIewWrap';
import { useState } from 'react';

const EventList = () => {
  //  정렬 상태
  const [sortOption, setSortOption] = useState({
    page: 1,
    sort: 'subDate',
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
      <br />
      <EventListVisualWrap />
      <EventListViewWrap
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Footer />
    </>
  );
};

export default EventList;
