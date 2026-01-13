// MovieCard.js
import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieSelect }) => {
  const { title, description, posterURL, rating, year, genre } = movie;

  const handleClick = () => {
    onMovieSelect(movie.id);
  };

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img 
          src={posterURL} 
          alt={`${title} poster`} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
          }}
        />
        <div className="movie-rating">
          <span className="rating-value">{rating}/10</span>
          <div className="star-rating">{renderStars()}</div>
        </div>
        <div className="play-overlay">
          <span className="play-icon">▶</span>
          <span className="play-text">Watch Trailer</span>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title} ({year})</h3>
        <div className="movie-genre">
          {genre && genre.map((g, index) => (
            <span key={index} className="genre-tag">{g}</span>
          ))}
        </div>
        <p className="movie-description">{description}</p>
        <div className="movie-meta">
          <span className="rating-badge">
            ⭐ {rating.toFixed(1)}
          </span>
          <span className="details-link">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    posterURL: PropTypes.string.isRequired,
    trailerLink: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    year: PropTypes.number,
    genre: PropTypes.array,
    duration: PropTypes.string,
    director: PropTypes.string,
    cast: PropTypes.array
  }).isRequired,
  onMovieSelect: PropTypes.func.isRequired
};

export default MovieCard;
