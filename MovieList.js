// MovieList.js
import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieSelect }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-list">
      <h2 className="movie-list-title">
        Available Movies <span className="movie-count">({movies.length})</span>
      </h2>
      
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      posterURL: PropTypes.string.isRequired,
      trailerLink: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired
    })
  ).isRequired,
  onMovieSelect: PropTypes.func.isRequired
};

export default MovieList;
