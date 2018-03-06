import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MODERN_HEBREW from '../lib/HebrewKeyboard';

class AnnotationKeyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderKey(letter) {
    return (
      <button className="annotation-keyboard__button" key={letter.characterID}>
        <span>{letter.character}</span>
      </button>
    );
  }

  renderRow(row, i) {
    return (
      <div className="annotation-keyboard__row">
        {row.map((letter) => {
          return this.renderKey(letter);
        })}
        {i === 1 && (
          <button className="annotation-keyboard__button enter-button">Enter</button>
        )}
      </div>
    );
  }

  render() {
    const byRow = [];
    byRow.push(MODERN_HEBREW.slice(0, 7));
    byRow.push(MODERN_HEBREW.slice(8, 17));
    byRow.push(MODERN_HEBREW.slice(18, 26));

    return (
      <div className="annotation-keyboard">
        {byRow.map((row, i) => {
          return this.renderRow(row, i);
        })}
        <div>
          <button className="annotation-keyboard__button space-button">Space</button>
        </div>
      </div>
    );
  }
}

export default connect()(AnnotationKeyboard);
