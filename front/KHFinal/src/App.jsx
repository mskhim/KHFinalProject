import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createContext, useState } from 'react';
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
