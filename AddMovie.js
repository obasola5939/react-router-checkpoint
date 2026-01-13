// AddMovie.js - Updated form with new fields
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddMovie = ({ onAddMovie }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    trailerLink: '',
    rating: '',
    year: '',
    duration: '',
    director: '',
    genre: '',
    cast: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.posterURL.trim()) {
      newErrors.posterURL = 'Poster URL is required';
    } else if (!isValidUrl(formData.posterURL)) {
      newErrors.posterURL = 'Please enter a valid URL';
    }

    if (!formData.trailerLink.trim()) {
      newErrors.trailerLink = 'Trailer link is required';
    } else if (!formData.trailerLink.includes('youtube.com/embed/')) {
      newErrors.trailerLink = 'Please enter a valid YouTube embed URL (should contain youtube.com/embed/)';
    }

    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else {
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        newErrors.rating = 'Rating must be between 0 and 10';
      }
    }

    if (formData.year && (isNaN(formData.year) || formData.year < 1888 || formData.year > new Date().getFullYear() + 5)) {
      newErrors.year = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddMovie(formData);
      setFormData({
        title: '',
        description: '',
        posterURL: '',
        trailerLink: '',
        rating: '',
        year: '',
        duration: '',
        director: '',
        genre: '',
        cast: ''
      });
      setErrors({});
      setIsSubmitting(false);
      alert('🎬 Movie added successfully!');
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      posterURL: '',
      trailerLink: '',
      rating: '',
      year: '',
      duration: '',
      director: '',
      genre: '',
      cast: ''
    });
    setErrors({});
  };

  return (
    <div className="add-movie-container">
      <h2 className="add-movie-title">➕ Add New Movie</h2>
      
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Movie Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie title"
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="year" className="form-label">
              Release Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="2024"
              min="1888"
              max={new Date().getFullYear() + 5}
              className={`form-input ${errors.year ? 'error' : ''}`}
            />
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            rows="4"
            className={`form-textarea ${errors.description ? 'error' : ''}`}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="posterURL" className="form-label">
              Poster URL *
            </label>
            <input
              id="posterURL"
              type="url"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              className={`form-input ${errors.posterURL ? 'error' : ''}`}
            />
            {errors.posterURL && (
              <span className="error-message">{errors.posterURL}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="trailerLink" className="form-label">
              Trailer URL *
            </label>
            <input
              id="trailerLink"
              type="url"
              name="trailerLink"
              value={formData.trailerLink}
              onChange={handleChange}
              placeholder="https://youtube.com/embed/VIDEO_ID"
              className={`form-input ${errors.trailerLink ? 'error' : ''}`}
            />
            {errors.trailerLink && (
              <span className="error-message">{errors.trailerLink}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating" className="form-label">
              Rating (0-10) *
            </label>
            <div className="rating-input-container">
              <input
                id="rating"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                placeholder="8.5"
                className={`form-input ${errors.rating ? 'error' : ''}`}
              />
              <span className="rating-hint">/10</span>
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              Duration
            </label>
            <input
              id="duration"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="120 min"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="director" className="form-label">
            Director
          </label>
          <input
            id="director"
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="Christopher Nolan"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="form-label">
            Genres (comma-separated)
          </label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Action, Sci-Fi, Drama"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cast" className="form-label">
            Cast (comma-separated)
          </label>
          <input
            id="cast"
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            placeholder="Actor 1, Actor 2, Actor 3"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Movie'}
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="reset-btn"
            disabled={isSubmitting}
          >
            Clear Form
          </button>
        </div>

        <div className="form-hint">
          <p>* Required fields</p>
          <p>• For trailer: Use YouTube embed URL (https://youtube.com/embed/VIDEO_ID)</p>
          <p>• Rating: 0-10 scale (e.g., 8.5)</p>
        </div>
      </form>
    </div>
  );
};

AddMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired
};

export default AddMovie;
