import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RouterComponent from './RouterComponent';
import { Provider } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <RouterComponent />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
