import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FavoritesButton = ({ expanded, favorite, rtl, toggleFavorite }) => {
  const heart = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
  const rtlSwitch = rtl ? 'row-reverse' : 'row';
  const Button = styled.button`
    flex-direction: ${rtlSwitch};
  `;

  return (
    <Button onClick={toggleFavorite}>
      <i className={heart} />
      {expanded && (<span>Add to Favorites</span>)}
    </Button>
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
