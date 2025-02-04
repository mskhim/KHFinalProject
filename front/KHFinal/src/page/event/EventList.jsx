import { Header, Footer } from '../../components';
import EventListVisualWrap from './component/EventListVisualWrap';
import EventListSearchWrap from './component/EventListSearchWrap';
import EventListViewWrap from './component/EventListVIewWrap';

const EventList = () => {
  return (
    <>
      <Header page="list" />
      <br />
      <EventListSearchWrap />
      <br />
      <br />
      <EventListVisualWrap />
      <br />
      <EventListViewWrap />
      <Footer />
    </>
  );
};

export default EventList;
