import React, {useContext} from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import './css/Announcement.css';
import { Context } from '../../../Context';

export default function Announcement() {
  const {
    darkMode, getDarkMode
  } = useContext(Context);
  return (
    <>
      <div className="Announcement">
        <Card
          className="Announcement-title"
          style={{ width: '14%', maxWidth: '300px', fontSize: "22px", height: '70px' }}
        >
          <Card.Body className="Announcement-text-center"><p>공지사항</p></Card.Body>
        </Card>
        <Card className="Announcement-content" style={{ width: '85%', height: '70px' }}>
          <Card.Body className='Announcement-content'>
            <p>This is some text within a card body.This is some text within a card body.</p>
            <div className='Announcement-button'>
            <Button variant={darkMode ? "dark-mode custom-inverted-dark-button" : 'outline-dark '}
                  className={darkMode ? "dark-mode custom-inverted-dark-button" : 'outline-dark '} 
                  >목록</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
