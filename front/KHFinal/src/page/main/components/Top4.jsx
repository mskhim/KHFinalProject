import React from 'react';
import Card from 'react-bootstrap/Card';
import './Top4.css';
import { useNavigate } from 'react-router-dom';

export default function Top4() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/eventList');
  };
  return (
    <>
      <div className="Top4-head">
        <Card
          className="bg-dark text-black Top4-card"
          style={{ width: '25%', height: 'auto', cursor: 'pointer' }}
          onClick={handleImageClick}
        >
          <Card.Img
            src="https://picsum.photos/600/900?random=1/50px170"
            alt="Card image"
            className="top4-image"
          />
          <Card.ImgOverlay>
            <Card.Title>Top 1</Card.Title>
            <Card.Text></Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>abc</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="bg-dark text-black Top4-card"
          style={{ width: '25%', height: 'auto', cursor: 'pointer' }}
          onClick={handleImageClick}
        >
          <Card.Img
            src="https://picsum.photos/600/900?random=2/50px170"
            alt="Card image"
            className="top4-image"
          />
          <Card.ImgOverlay>
            <Card.Title>Top 2</Card.Title>
            <Card.Text></Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>bcd</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="bg-dark text-black Top4-card"
          style={{ width: '25%', height: 'auto', cursor: 'pointer' }}
          onClick={handleImageClick}
        >
          <Card.Img
            src="https://picsum.photos/600/900?random=3/50px170"
            alt="Card image"
            className="top4-image"
          />
          <Card.ImgOverlay>
            <Card.Title>abc</Card.Title>
            <Card.Text></Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>Top1</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="bg-dark text-black Top4-card"
          style={{ width: '25%', height: 'auto', cursor: 'pointer' }}
          onClick={handleImageClick}
        >
          <Card.Img
            src="https://picsum.photos/600/900?random=4/50px170"
            alt="Card image"
            className="top4-image"
          />
          <Card.ImgOverlay>
            <Card.Title>Top 4</Card.Title>
            <Card.Text></Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>abc</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
