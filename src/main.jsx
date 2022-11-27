import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { Navbar } from './components/Navbar/Navbar';

// Pages

import './globals.css';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { Home } from './pages/Home/Home';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { SearchPage } from './pages/SearchPage.jsx/SearchPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/trendings' element={<p>Trendings...</p>}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/category/:id' element={<CategoryPage />}></Route>
        <Route path='/movie/:id' element={<MoviePage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
