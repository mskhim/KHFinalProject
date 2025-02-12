import React from 'react';
import { RouterProvider } from 'react-router-dom';
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
