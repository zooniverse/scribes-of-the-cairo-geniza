import React from 'react';
import PropTypes from 'prop-types';

const ConnectWithUs = ({ title })  => {
  return (
    <div className="statistics__connect">
      <h2>{title}</h2>
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
  title: PropTypes.string
};

ConnectWithUs.defaultProps = {
  title: 'Connect with the Geniza team for more content'
};

export default ConnectWithUs;
