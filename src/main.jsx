import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { SessionContextProvider } from './context/sessionContext';
import { ToastContainer } from 'react-toastify';

// Pages
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Home } from './pages/Home/Home';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { SearchPage } from './pages/SearchPage.jsx/SearchPage';
import { TrendingsPage } from './pages/TrendingsPage/TrendingsPage';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trendings' element={<TrendingsPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/category/:id' element={<CategoryPage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  </React.StrictMode>,
);
