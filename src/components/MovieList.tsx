
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { RootState } from '../app/store';
import { fetchPopularMovies } from '../Redux/movieSlice';
import { useAppDispatch } from '../app/hooks';
import LoadingSkeleton from './LoadingSkeleton';

function MovieList() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const popularMovies = useSelector((state: RootState) => state.movies.popular);

  useEffect(() => {
    const timer = setTimeout(() => {
    dispatch(fetchPopularMovies()); 
    setIsLoading(false); 
  }, 1000);
  return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSkeleton />
  }

  

  return (
    <div>
    <div className="row">
      {popularMovies.map((movie) => (
        <div className="col-md-4 mb-4 d-inline" key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            overview={movie.overview} />
        </div>
      ))}
      </div>

      <h3>Comedy Movies</h3>
<div className="row">
  {popularMovies
    .filter((movie) => movie.genres && movie.genres.includes('Comedy'))
    .map((movie) => (
      <div className="col-md-4 mb-4" key={movie.id}>
        <MovieCard
          id={movie.id}
          title={movie.title}
          imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          overview={movie.overview}
        />
      </div>
    ))}
</div>
    </div>
  );
}

export default MovieList;
