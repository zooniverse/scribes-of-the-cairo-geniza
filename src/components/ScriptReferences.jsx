import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardOptions, KEYBOARD_TYPES } from '../lib/KeyboardTypes';
import { toggleDialog } from '../ducks/dialog';
import { setKeyboard } from '../ducks/keyboard';
import {
  changeKeyboard, toggleScripts,
  setFilters
} from '../ducks/crib-sheet';

class ScriptReferences extends React.Component {
  constructor() {
    super();

    this.toggleSelection = this.toggleSelection.bind(this);
    this.renderLetters = this.renderLetters.bind(this);
    this.renderScripts = this.renderScripts.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.changeScript = this.changeScript.bind(this);
    this.sendToKeyboard = this.sendToKeyboard.bind(this);
  }

  sendToKeyboard() {
    const script = this.props.activeScript;
    const activeIndex = KeyboardOptions.indexOf(script);
    this.props.dispatch(setKeyboard(activeIndex));
    this.props.dispatch(toggleDialog());
  }

  toggleSelection() {
    this.props.dispatch(toggleScripts());
  }

  toggleFilter(filter) {
    this.props.dispatch(setFilters(filter));
  }

  changeScript(script) {
    this.props.dispatch(toggleScripts());
    this.props.dispatch(changeKeyboard(script));
  }

  renderFilters() {
    const allActive = this.props.activeFilters.length === 3;
    const allActiveFilters = allActive ? 'active-filter' : '';
    return (
      <div className="script-references__filter">
        <span className="secondary-label">Filter Scripts By</span>
        <div>
          {Object.keys(KEYBOARD_TYPES).map((key, i) => {
            const isActive = this.props.activeFilters.indexOf(KEYBOARD_TYPES[key]) >= 0;
            const activeClass = isActive && !allActive ? 'active-filter' : '';
            return (
              <button
                className={`secondary-label ${activeClass}`}
                key={`SCRIPT_FILTER_${i}`}
                onClick={this.toggleFilter.bind(this, key)}
              >
                {KEYBOARD_TYPES[key]}
              </button>
            );
          })}
          <button className={`secondary-label ${allActiveFilters}`} onClick={this.toggleFilter.bind(this, null)}>All</button>
        </div>
      </div>
    );
  }

  renderLetter(letter, i) {
    const removeCamel = letter.replace(/([A-Z])/g, ' $1');
    const styles = {};
    styles.backgroundImage = `url('${this.props.activeScript.img}')`;

    return (
      <div className="script-references__character" key={`CRIB_CHARACTER_${i}`}>
        <div
          className={letter}
          style={styles}
        />
        <span>{removeCamel}</span>
      </div>
    );
  }

  renderLetters() {
    return (
      <div className="script-references__letters">
        <div>
          {this.props.activeScript.letters.map((letter, i) => {
            return this.renderLetter(letter, i);
          })}
        </div>
        <div>
          <button className="button" onClick={this.sendToKeyboard}>
            Send Script to Keyboard &#10132;
          </button>
        </div>
      </div>
    );
  }

  renderScript(collection, type) {
    if (this.props.activeFilters.indexOf(type) < 0) {
      return null;
    }

    return (
      <div className="script-references__groups" key={`${type}_KEYBOARDS`}>
        <span>{type}</span>
        <span>One sentence about where {type} is found.</span>
        <div className="script-references__scripts">
          {collection.map((script, i) => {
            const styles = {};
            styles.backgroundImage = `url('${script.img}')`;
            return (
              <div key={`SCRIPT_TYPE_${i}`}>
                <button className="script-references__script-preview" onClick={this.changeScript.bind(this, script)}>
                  <div className="alef" style={styles} />
                  <div className={`script-references__script ${script.class}`} />
                </button>
                <span>{script.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderScripts() {
    const dividedKeyboards = KeyboardOptions.reduce((memo, x) => {
      if (!memo[x.type]) { memo[x.type] = []; }
      memo[x.type].push(x);
      return memo;
    }, {});

    return (
      <div>
        {Object.keys(dividedKeyboards).map((key) => {
          return this.renderScript(dividedKeyboards[key], key);
        })}
      </div>
    );
  }

  render() {
    const toggleText = this.props.scriptSelection ? 'Back' : 'Change';
    const rightPanel = !this.props.scriptSelection ? (
      <span className="body-font">
        Change the script type to see variations in character
        formation based on location and time period.
      </span>) : this.renderFilters();
    const bodyRender = this.props.scriptSelection ? this.renderScripts() : this.renderLetters();

    return (
      <div className="script-references handle">
        <div className="script-references__header">
          <div>
            <span className="secondary-label">Current Script Type</span>
            <div>
              <span className="h1-font">{this.props.activeScript.name} {this.props.activeScript.type}</span>
              <button className="text-link" onClick={this.toggleSelection}>{toggleText}</button>
            </div>
          </div>
          <div>
            {rightPanel}
          </div>
        </div>
        {bodyRender}
      </div>
    );
  }
}

ScriptReferences.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  activeScript: PropTypes.shape({
    letters: PropTypes.array,
    img: PropTypes.string,
    name: PropTypes.string
  }),
  dispatch: PropTypes.func,
  scriptSelection: PropTypes.bool
};

ScriptReferences.defaultProps = {
  activeFilters: [],
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  scriptSelection: false
};

const mapStateToProps = state => ({
  activeScript: state.cribSheet.activeScript,
  activeFilters: state.cribSheet.activeFilters,
  scriptSelection: state.cribSheet.scriptSelection
});

export default connect(mapStateToProps)(ScriptReferences);
