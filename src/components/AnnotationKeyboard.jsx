import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MODERN_HEBREW from '../lib/HebrewKeyboard';
import MODERN_ARABIC from '../lib/ArabicKeyboard';

class AnnotationKeyboard extends React.Component {
  constructor() {
    super();

    this.lettersToRows = this.lettersToRows.bind(this);

    this.state = {
      lettersByRows: []
    };
  }

  componentWillMount() {
    this.lettersToRows();
  }

  letterClick(letter) {
    this.props.onLetterClick(letter);
  }

  lettersToRows() {
    const byRow = [];
    Object.keys(MODERN_HEBREW).map((key) => {
      const letter = MODERN_HEBREW[key];
      if (!byRow[letter.row]) {
        byRow[letter.row] = [];
      }
      byRow[letter.row].push(letter);
    });
    this.setState({ lettersByRows: byRow });
  }

  renderKey(letter) {
    const showScript = !this.props.showModern ? `char-button ${letter.name}` : '';
    const characterRep = letter.unicode ? letter.unicode : letter.character;
    const styles = {};
    if (!this.props.showModern) {
      styles.backgroundImage = `url('${this.props.activeScript.img}')`;
    }
    return (
      <button
        className={classnames(`annotation-keyboard__button ${showScript}`, {
          'char-button__active': this.props.activeKey === letter.name
        })}
        key={letter.characterID}
        onClick={this.letterClick.bind(this, letter)}
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
          <button className="annotation-keyboard__button enter-button" onClick={this.props.onEnter}>Enter</button>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="annotation-keyboard">
        {this.state.lettersByRows.map((row, i) => this.renderRow(row, i))}
        <div>
          <button className="annotation-keyboard__button space-button">Space</button>
        </div>
      </div>
    );
  }
}

AnnotationKeyboard.propTypes = {
  activeKey: PropTypes.string,
  activeScript: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string
  }),
  onLetterClick: PropTypes.func,
  onEnter: PropTypes.func,
  showModern: PropTypes.bool
};

AnnotationKeyboard.defaultProps = {
  activeKey: null,
  activeScript: null,
  onLetterClick: () => {},
  onEnter: () => {},
  showModern: true
};

const mapStateToProps = state => ({
  activeKey: state.keyboard.activeKey,
  activeScript: state.keyboard.activeScript,
  showModern: state.keyboard.modern
});

export default connect(mapStateToProps)(AnnotationKeyboard);
