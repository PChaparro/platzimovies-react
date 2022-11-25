import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<p>Home page...</p>}></Route>
        <Route path='/trendings' element={<p>Trendings...</p>}></Route>
        <Route path='/search' element={<p>Search by name...</p>}></Route>
        <Route path='/category/:name' element={<p>Category...</p>}></Route>
        <Route path='/movie/:id' element={<p>Movie details...</p>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
