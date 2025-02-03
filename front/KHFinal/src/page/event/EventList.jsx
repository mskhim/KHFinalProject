import { Header, Footer } from '../../components';
import EventListVisualWrap from './component/EventListVisualWrap';
import EventListSearchWrap from './component/EventListSearchWrap';

const EventList = () => {
  return (
    <>
      <Header page="list" />
      <EventListSearchWrap />
      <h1>EventList</h1>
      <Footer />
    </>
  );
};

export default EventList;
