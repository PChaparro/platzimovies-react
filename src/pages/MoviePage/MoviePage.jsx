import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetMovieService, GetSimilarsService } from '../../services/movies.services';

import { MovieDetails } from '../../components/MovieDetails/MovieDetails';
import randomColor from 'randomcolor';

export const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similars, setSimilars] = useState([]);

  // Get movie details and related movies
  const load = () => {
    const getMovieDetails = async () => {
      const details = await GetMovieService(id);

      const film = details.movie;
      film.genres = film.genres.map((genre) => {
        return { category: genre.name, color: randomColor(), id: genre.id };
      });

      setMovie(details.movie);
    };

    const getSimilars = async () => {
      const similars = await GetSimilarsService(id);
      setSimilars(similars.movies);
    };

    getMovieDetails();
    getSimilars();
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    load();
  }, []);

  return <MovieDetails movie={movie} similars={similars} />;
};
