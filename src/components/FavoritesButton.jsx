import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

const FavoritesButton = ({ expanded, favorite, translate, toggleFavorite }) => {
  const heart = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
  return (
    <button onClick={toggleFavorite}>
      <i className={heart} />
      {expanded && (<span>{translate('toolbar.addFavorites')}</span>)}
    </button>
  );
};

FavoritesButton.defaultProps = {
  expanded: false,
  favorite: false,
  translate: () => {}
};

FavoritesButton.propTypes = {
  expanded: PropTypes.bool,
  favorite: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  translate: PropTypes.func
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(FavoritesButton);
