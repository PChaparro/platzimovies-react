import { useEffect } from 'react';

import { HomeHero } from '../../components/HomeHero/HomeHero';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { CategoriesGrid } from '../../components/CategoriesGrid/CategoriesGrid';

import randomColor from 'randomcolor';

import { GetTrendingsService, GetCategoriesService } from '../../services/movies.services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

export const Home = () => {
  const navigate = useNavigate();

  const [loadingTrendings, setLoadingTrendings] = useState(true);
  const [trendings, setTrendings] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  // Go to the search page when the form is submitted
  const handleSearch = (value) => {
    navigate({ pathname: '/search', search: `criteria=${value}` });
  };

  // Get movies and genres
  useEffect(() => {
    const getTrendings = async () => {
      const reply = await GetTrendingsService(1);
      setTrendings(reply.movies);
      setLoadingTrendings(false);
    };

    const getCategories = async () => {
      const reply = await GetCategoriesService();
      const { genres } = reply;

      const enhancedCategories = genres.map((category) => {
        return { id: category.id, category: category.name, color: randomColor() };
      });

      setCategories(enhancedCategories);
      setLoadingCategories(false);
    };

    getTrendings();
    getCategories();
  }, []);

  return (
    <>
      <HomeHero />
      <SearchBar callback={handleSearch} />
      <section className='section container'>
        {
          <>
            <h2 className='section__title'>Tendencias</h2>

            {loadingTrendings ? (
              <Loader />
            ) : (
              <MoviesGrid isSlider={true}>
                {trendings.map((movie, index) => {
                  return (
                    <MovieCard
                      key={`trendings-${index}`}
                      movie={movie}
                      lazy={index >= 3 ? true : false}
                      isSlider={true}
                    />
                  );
                })}
              </MoviesGrid>
            )}
          </>
        }
      </section>
      <section className='section container'>
        {
          <>
            <h2 className='section__title' id='categories'>
              Categorias
            </h2>
            {loadingCategories ? <Loader /> : <CategoriesGrid categories={categories} />}
          </>
        }
      </section>
    </>
  );
};
