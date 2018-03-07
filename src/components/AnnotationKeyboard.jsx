import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MODERN_HEBREW from '../lib/HebrewKeyboard';

class AnnotationKeyboard extends React.Component {
  renderKey(letter) {
    const showScript = !this.props.showModern ? `char-button ${letter.name}` : '';
    const characterRep = letter.unicode ? letter.unicode : letter.character;
    const styles = {};
    if (!this.props.showModern) {
      styles.backgroundImage = `url('${this.props.activeScript.img}')`;
    }
    return (
      <button
        className={`annotation-keyboard__button ${showScript}`}
        key={letter.characterID}
        style={styles}
      >
        {this.props.showModern && (
          <span>{characterRep}</span>
        )}
      </button>
    );
  }

  renderRow(row, i) {
    return (
      <div key={`KEYBOARD_ROW_${i}`} className="annotation-keyboard__row">
        {row.map(letter => this.renderKey(letter))}
        {i === 1 && (
          <button className="annotation-keyboard__button enter-button">Enter</button>
        )}
      </div>
    );
  }

  render() {
    const byRow = [];
    byRow.push(MODERN_HEBREW.slice(0, 8));
    byRow.push(MODERN_HEBREW.slice(8, 18));
    byRow.push(MODERN_HEBREW.slice(18, 27));

    return (
      <div className="annotation-keyboard">
        {byRow.map((row, i) => this.renderRow(row, i))}
        <div>
          <button className="annotation-keyboard__button space-button">Space</button>
        </div>
      </div>
    );
  }
}

AnnotationKeyboard.propTypes = {
  activeScript: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string
  }),
  showModern: PropTypes.bool
};

AnnotationKeyboard.defaultProps = {
  activeScript: null,
  showModern: true
};

const mapStateToProps = state => ({
  activeScript: state.keyboard.activeScript,
  showModern: state.keyboard.modern
});

export default connect(mapStateToProps)(AnnotationKeyboard);
