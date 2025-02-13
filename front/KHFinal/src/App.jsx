import React, { useEffect } from 'react';
import { RouterProvider, useLocation } from 'react-router-dom';
import { Provider } from './Context';
import root from './Routes/root';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function App() {
  return (
    <Provider>
      <RouterProvider router={root} />
    </Provider>
  );
}

export default App;
