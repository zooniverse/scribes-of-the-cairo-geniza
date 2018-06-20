import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { LANGUAGES } from '../ducks/languages';

const WIDTH = 450;
const SIDE_BUFFER = 8;
const TOP_BUFFER = 40;

const additionalModifierText = (translate, language) => {
  const types = ['insertion', 'deletion', 'damaged', 'drawing', 'grid'];
  if (language === LANGUAGES.HEBREW) {
    types.push('divineName');
  }

  return (
    <div>
      {types.map((type) => {
        return (
          <div className="text-modifier-help__additional-text" key={type}>
            <span>{translate(`helpModals.modifiers.${type}.title`)}</span>
            <span>{translate(`helpModals.modifiers.${type}.content`)}</span>
            <span>{translate(`helpModals.modifiers.${type}.example`)}</span>
          </div>
        );
      })}
    </div>
  );
};

const HelpModal = ({ helpBox, type, questionMark, text, togglePopup, translate, manuscriptLanguage }) => {
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
      <div className="text-modifier-help__content">
        <span className="primary-label">What&apos;s This?</span>
        <button className="primary-label" onClick={togglePopup}>X</button>
      </div>
      <hr className="plum-line" />
      <div className="text-modifier-help__content">
        <span className="body-font">
          {text}
        </span>

        {(type === 'modifierHelp') && (additionalModifierText(translate, manuscriptLanguage))}
      </div>
    </div>
  );
};

HelpModal.propTypes = {
  //helpBox: PropTypes.object.isRequired,  //WARNING: helpBox is a reference to a component, but it's not actually an object. We'll remove this until we can figure out what's wrong here.
  manuscriptLanguage: PropTypes.string.isRequired,
  questionMark: PropTypes.shape({
    innerHeight: PropTypes.number
  }).isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  togglePopup: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manuscriptLanguage: state.workflow.manuscriptLanguage,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(HelpModal);
