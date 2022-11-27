import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { GetMovieService, GetSimilarsService } from '../../services/movies.services';

import { MovieDetails } from '../../components/MovieDetails/MovieDetails';
import randomColor from 'randomcolor';

export const MoviePage = () => {
  const { triggerErrorNotification } = useNotification();
  const navigate = useNavigate();

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similars, setSimilars] = useState([]);

  // Get movie details and related movies
  const load = () => {
    const getMovieDetails = async () => {
      const reply = await GetMovieService(id);

      if (!reply.success) {
        triggerErrorNotification('Unable to find a movie with the given id');
        return navigate('/');
      }

      const film = reply.movie;
      film.genres = film.genres.map((genre) => {
        return { category: genre.name, color: randomColor(), id: genre.id };
      });

      setMovie(reply.movie);
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

  return <MovieDetails movie={movie} similars={similars} />;
};
