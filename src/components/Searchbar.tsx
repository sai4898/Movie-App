
import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';

import MovieCard from './MovieCard';
import { fetchPopularMovies } from '../Redux/movieSlice';
import { AiTwotoneHome } from 'react-icons/ai';

import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { NavLink } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function Searchbar() {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate()
  const popularMovies = useSelector((state: RootState) => state.movies.popular);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filteredMovies = popularMovies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredMovies);
    } else {
      setSearchResults([]); 
    }
  }, [searchQuery, popularMovies]);

  return (
    <div>
      <div className='search-container'>
      <input
      title='Search'
      className='input'
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} />
      <div>

      <NavLink to ='/' className='home-link'>
        <AiTwotoneHome size={25} className='home-icon' title='Home' />
      </NavLink>
      </div>
      </div>
      <div className="row">
        {searchResults ? (
          searchResults.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                overview={movie.overview} />
            </div>
          ))
        ) : (
         searchQuery && <p>No results</p>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
