import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import './css/Announcement.css';
import { Context } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import { ButtonDarkMode } from '../../../components/ui';

export default function Announcement() {
  const { darkMode } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <div className="Announcement">
        <Card
          className="Announcement-title"
          style={{
            width: '14%',
            maxWidth: '300px',
            fontSize: '22px',
            height: '70px',
          }}
        >
          <Card.Body className="Announcement-text-center">
            <p>공지사항</p>
          </Card.Body>
        </Card>
        <Card
          className="Announcement-content"
          style={{ width: '85%', height: '70px' }}
        >
          <Card.Body className="Announcement-content">
            <p>
              This is some text within a card body.This is some text within a
              card body.
            </p>
            <div
              className={
                darkMode
                  ? 'Announcement-dark-mode-button'
                  : 'Announcement-light-mode-button'
              }
            >
              <ButtonDarkMode
                onClick={() => navigate('/noticeList')}
                text="목록"
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
