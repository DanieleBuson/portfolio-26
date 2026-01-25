import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingCall from './pages/BookingCall/BookingCall';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './i18n';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/booking" element={<BookingCall />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
