import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingScreen from './screen/landing/LandingScreen';
import Dashboard from 'screen/dashboard';

const subdomain = window.location.host.split('.')[0];

ReactDOM.render(
  <React.StrictMode>
    {
      subdomain === 'app' ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter> :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
          </Routes>
        </BrowserRouter>
    }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
