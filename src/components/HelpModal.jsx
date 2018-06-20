import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 450;
const SIDE_BUFFER = 8;
const TOP_BUFFER = 40;

const HelpModal = ({ helpBox, questionMark, text, togglePopup }) => {
  const style = {
    left: (questionMark.offsetLeft - (WIDTH / 2)) + SIDE_BUFFER,
    top: questionMark.offsetTop + TOP_BUFFER,
    width: WIDTH
  };

  return (
    <div
      className="text-modifier-help"
      ref={helpBox}
      style={style}
    >
      <div>
        <span className="primary-label">What&apos;s This?</span>
        <button className="primary-label" onClick={togglePopup}>X</button>
      </div>
      <hr className="plum-line" />
      <div>
        <span className="body-font">
          {text}
        </span>
      </div>
    </div>
  );
};

HelpModal.propTypes = {
  //helpBox: PropTypes.object.isRequired,  //WARNING: helpBox is a reference to a component, but it's not actually an object. We'll remove this until we can figure out what's wrong here.
  questionMark: PropTypes.shape({
    innerHeight: PropTypes.number
  }).isRequired,
  text: PropTypes.string.isRequired,
  togglePopup: PropTypes.func.isRequired
};

export default HelpModal;
