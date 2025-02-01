import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './RouterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}

export default App;
