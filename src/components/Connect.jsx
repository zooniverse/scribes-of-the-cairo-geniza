import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

const ConnectWithUs = ({ translate }) => {
  return (
    <div className="statistics__connect">
      <h2>Connect with the Geniza team for more content</h2>
      <div className="statistics__buttons">
        <a href="https://twitter.com/judaicadh" className="button" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter" />Twitter</a>
        <a href="https://facebook.com/judaicadh" className="button" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f" />Facebook</a>
        <a href="https://instagram.com/judaica_dh" className="button" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram" />Instagram</a>
        <a href="https://medium.com/@judaicadh/" className="button" rel="noopener noreferrer" target="_blank"><i className="fab fa-medium-m" />Medium</a>
      </div>
    </div>
  );
};

ConnectWithUs.propTypes = {
  translate: PropTypes.func
};

ConnectWithUs.defaultProps = {
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(ConnectWithUs);
