import { Header, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import EventMapKorea from './include/EventMapKorea';
import EventMapList from './include/EventMapList';

const EventMap = () => {
  return (
    <>
      <Header page="map" />
      <Container>
        <EventMapKorea />
        <EventMapList />
      </Container>
      <Footer />
    </>
  );
};

export default EventMap;
