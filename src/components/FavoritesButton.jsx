import React from 'react';
import PropTypes from 'prop-types';

const FavoritesButton = ({ expanded, favorite, toggleFavorite }) => {
  const heart = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
  return (
    <button onClick={toggleFavorite}>
      <i className={heart} />
      {expanded && (<span>Add to Favorites</span>)}
    </button>
  );
};

FavoritesButton.defaultProps = {
  expanded: false,
  favorite: false
};

FavoritesButton.propTypes = {
  expanded: PropTypes.bool,
  favorite: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired
};

export default FavoritesButton;
