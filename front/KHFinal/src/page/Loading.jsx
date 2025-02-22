import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loading;
