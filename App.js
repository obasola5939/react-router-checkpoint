// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import './App.css';

const AppContent = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0",
      rating: 8.8,
      genre: ["Action", "Sci-Fi", "Thriller"],
      duration: "148 min",
      year: 2010,
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      trailerLink: "https://www.youtube.com/embed/6hB3S9bIaco",
      rating: 9.3,
      genre: ["Drama"],
      duration: "142 min",
      year: 1994,
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      trailerLink: "https://www.youtube.com/embed/EXeTwQWrcwY",
      rating: 9.0,
      genre: ["Action", "Crime", "Drama"],
      duration: "152 min",
      year: 2008,
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      trailerLink: "https://www.youtube.com/embed/s7EdQ4FqbhY",
      rating: 8.9,
      genre: ["Crime", "Drama"],
      duration: "154 min",
      year: 1994,
      director: "Quentin Tarantino",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    }
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const navigate = useNavigate();

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'title') {
      setTitleFilter(value);
      applyFilters(value, ratingFilter);
    } else if (filterType === 'rating') {
      setRatingFilter(value);
      applyFilters(titleFilter, value);
    }
  };

  // Apply filters to movies
  const applyFilters = (title, rating) => {
    const filtered = movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(title.toLowerCase());
      const matchesRating = movie.rating >= rating;
      return matchesTitle && matchesRating;
    });
    setFilteredMovies(filtered);
  };

  // Add a new movie
  const handleAddMovie = (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: movies.length + 1,
      rating: parseFloat(newMovie.rating),
      genre: newMovie.genre ? newMovie.genre.split(',').map(g => g.trim()) : [],
      cast: newMovie.cast ? newMovie.cast.split(',').map(c => c.trim()) : []
    };
    
    const updatedMovies = [...movies, movieWithId];
    setMovies(updatedMovies);
    applyFilters(titleFilter, ratingFilter);
    navigate('/'); // Navigate back to home after adding
  };

  // Handle movie selection
  const handleMovieSelect = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <header className="App-header">
              <h1>🎬 Movie Collection</h1>
              <p>Browse, filter, and add your favorite movies</p>
              <Link to="/" className="home-link">🏠 Home</Link>
            </header>

            <div className="container">
              <div className="sidebar">
                <AddMovie onAddMovie={handleAddMovie} />
              </div>

              <div className="main-content">
                <Filter 
                  onFilterChange={handleFilterChange}
                  titleFilter={titleFilter}
                  ratingFilter={ratingFilter}
                />
                
                <MovieList 
                  movies={filteredMovies} 
                  onMovieSelect={handleMovieSelect}
                />
                
                {filteredMovies.length === 0 && (
                  <div className="no-results">
                    <h3>No movies found matching your criteria</h3>
                    <p>Try adjusting your filters or add a new movie!</p>
                  </div>
                )}
              </div>
            </div>

            <footer className="App-footer">
              <p>Total Movies: {movies.length} | Showing: {filteredMovies.length}</p>
            </footer>
          </>
        } />
        
        <Route path="/movie/:id" element={
          <MovieDetails 
            movies={movies}
            onBack={() => navigate('/')}
          />
        } />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
