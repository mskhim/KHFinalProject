import React from 'react';
import Card from 'react-bootstrap/Card';
import './css/Announcement.css';
export default function Announcement() {
  return (
    <>
      <div className="Announcement">
        <Card
          className="Announcement-title"
          style={{ width: '14%', maxWidth: '300px' }}
        >
          <Card.Body className="text-center">공지사항</Card.Body>
        </Card>
        <Card className="Announcement-content" style={{ width: '85%' }}>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      </div>
    </>
  );
}
