import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 450;
const BUFFER = 8;

const TextModifierHelp = ({ helpBox, questionMark, togglePopup }) => {
  const style = {
    left: (questionMark.offsetLeft - (WIDTH / 2)) + BUFFER,
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
          Use these text modifiers to indicate special occurrences. Highlight the
          text and click the applicable modifier. Find examples of each in the
          Field Guide.
        </span>
      </div>
    </div>
  );
};

TextModifierHelp.propTypes = {
  //helpBox: PropTypes.object.isRequired,  //WARNING: helpBox is a reference to a component, but it's not actually an object. We'll remove this until we can figure out what's wrong here.
  questionMark: PropTypes.shape({
    innerHeight: PropTypes.number
  }).isRequired,
  togglePopup: PropTypes.func.isRequired
};

export default TextModifierHelp;
