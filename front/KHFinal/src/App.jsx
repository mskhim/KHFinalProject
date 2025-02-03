import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import RouterComponent from './RouterComponent';
import RouterComponentAdmin from './RouterComponentAdmin';

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
