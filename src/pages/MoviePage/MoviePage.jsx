import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetMovieService } from '../../services/movies.services';

import { MovieDetails } from '../../components/MovieDetails/MovieDetails';
import randomColor from 'randomcolor';

export const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await GetMovieService(id);

      const film = details.movie;
      film.genres = film.genres.map((genre) => {
        return { category: genre.name, color: randomColor(), id: genre.id };
      });

      setMovie(details.movie);
    };

    getMovieDetails();
  }, []);

  return <MovieDetails movie={movie} />;
};
