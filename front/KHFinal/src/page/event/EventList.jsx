import { Header, Footer } from '../../components';
import EventListVisualWrap from './include/EventListVisualWrap';
import EventListSearchWrap from './include/EventListSearchWrap';
import EventListViewWrap from './include/EventListVIewWrap';

const EventList = () => {
  return (
    <>
      <Header page="list" />
      <br />
      <EventListSearchWrap />
      <br />
      <EventListVisualWrap />
      <EventListViewWrap />
      <Footer />
    </>
  );
};

export default EventList;
