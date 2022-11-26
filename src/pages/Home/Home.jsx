import { useEffect } from 'react';

import { HomeHero } from '../../components/HomeHero/HomeHero';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { CategoriesGrid } from '../../components/CategoriesGrid/CategoriesGrid';

import randomColor from 'randomcolor';

import { GetTrendingsService, GetCategoriesService } from '../../services/movies.services';
import { useState } from 'react';

export const Home = () => {
  const [trendings, setTrendings] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Trending movies
    const getTrendings = async () => {
      const reply = await GetTrendingsService(1);
      setTrendings(reply.movies);
    };

    const getCategories = async () => {
      const reply = await GetCategoriesService();
      const { genres } = reply;

      const enhancedCategories = genres.map((category) => {
        return { id: category.id, category: category.name, color: randomColor() };
      });

      setCategories(enhancedCategories);
    };

    getTrendings();
    getCategories();
  }, []);

  return (
    <>
      <HomeHero />
      <SearchBar />
      <section className='section container'>
        {
          <>
            <h2 className='section__title'>Tendencias</h2>
            <MoviesGrid movies={trendings} isSlider={true} />
          </>
        }
      </section>
      <section className='section container'>
        {
          <>
            <h2 className='section__title' id='categories'>
              Categorias
            </h2>
            <CategoriesGrid categories={categories} />
          </>
        }
      </section>
    </>
  );
};
