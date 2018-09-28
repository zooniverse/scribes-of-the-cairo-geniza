import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

const SubjectError = ({ translate }) => {
  return (
    <div>
      <h2 className="h1-font">{translate('noSubject.title')}</h2>
      <Link className="button" to="/">{translate('noSubject.back')}</Link>
      <button
        className="button button__dark"
        onClick={window.location.reload.bind(window.location)}
      >
        {translate('noSubject.reload')}</button>
    </div>
  );
};

SubjectError.propTypes = {
  translate: PropTypes.func
};

SubjectError.defaultProps = {
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(SubjectError);
