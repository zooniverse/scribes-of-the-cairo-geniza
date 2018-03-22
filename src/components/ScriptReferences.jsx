import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { KeyboardOptions, KEYBOARD_TYPES } from '../lib/KeyboardTypes';
import { setKeyboard, toggleKeyboard, toggleModern } from '../ducks/keyboard';
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

    this.state = {
      keyboardSent: false
    };
  }

  sendToKeyboard() {
    const script = this.props.activeScript;
    const activeIndex = KeyboardOptions.indexOf(script);
    this.props.dispatch(setKeyboard(activeIndex));
    this.props.dispatch(toggleModern(true));
    this.props.dispatch(toggleKeyboard(true));
    this.setState({ keyboardSent: true });
    setTimeout(() => {
      this.setState({ keyboardSent: false });
    }, 4000);
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
    return (
      <div className="script-references__filter">
        <span className="secondary-label">{this.props.translate('scriptReferences.filterBy')}</span>
        <div>
          {Object.keys(KEYBOARD_TYPES).map((key, i) => {
            const isActive = this.props.activeFilters.indexOf(KEYBOARD_TYPES[key]) >= 0;
            return (
              <button
                className={classnames('secondary-label', {
                  'active-filter': isActive && !allActive
                })}
                key={`SCRIPT_FILTER_${i}`}
                onClick={this.toggleFilter.bind(this, key)}
              >
                {this.props.translate(`scriptReferences.${KEYBOARD_TYPES[key].toLowerCase()}`)}
              </button>
            );
          })}
          <button
            className={classnames('secondary-label', {
              'active-filter': allActive
            })}
            onClick={this.toggleFilter.bind(this, null)}
          >
            All
          </button>
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
    const text = !this.state.keyboardSent ? `${this.props.translate('scriptReferences.sendScript')} \u2192` : 'Sent'

    return (
      <div className="script-references__letters">
        <div>
          {this.props.activeScript.letters.map((letter, i) => this.renderLetter(letter, i))}
        </div>
        <div>
          <button
            className={classnames('button', {
              'script-sent': this.state.keyboardSent
            })}
            onClick={this.sendToKeyboard}
          >
            {text}
          </button>
          {this.state.keyboardSent && (
            <span>
              {this.props.activeScript.name} {this.props.activeScript.type} is now active in your transcription keyboard
            </span>
          )}
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
        <span>{this.props.translate(`scriptReferences.${type.toLowerCase()}`)}</span>
        <span>One sentence about where {type} is found.</span>
        <div className="script-references__scripts">
          {collection.map((script, i) => {
            const scriptTitle = script.name.toLowerCase().replace(/\s+/g, '');
            const styles = {};
            styles.backgroundImage = `url('${script.img}')`;
            return (
              <div key={`SCRIPT_TYPE_${i}`}>
                <button className="script-references__script-preview" onClick={this.changeScript.bind(this, script)}>
                  <div className="alef" style={styles} />
                  <div className={`script-references__script ${script.class}`} />
                </button>
                <span>{this.props.translate(`scriptReferences.types.${scriptTitle}`)}</span>
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
        {Object.keys(dividedKeyboards).map(key => this.renderScript(dividedKeyboards[key], key))}
      </div>
    );
  }

  render() {
    const toggleText = this.props.scriptSelection ? this.props.translate('scriptReferences.back') : this.props.translate('scriptReferences.changeScript');
    const rightPanel = !this.props.scriptSelection ? (
      <span className="body-font">
        {this.props.translate('scriptReferences.changeInstructions')}
      </span>) : this.renderFilters();
    const bodyRender = this.props.scriptSelection ? this.renderScripts() : this.renderLetters();

    return (
      <div className="script-references handle">
        <div className="script-references__header">
          <div>
            <span className="secondary-label">{this.props.translate('scriptReferences.currentScript')}</span>
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
    name: PropTypes.string,
    type: PropTypes.string
  }),
  dispatch: PropTypes.func,
  scriptSelection: PropTypes.bool,
  translate: PropTypes.func
};

ScriptReferences.defaultProps = {
  activeFilters: [],
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  scriptSelection: false,
  translate: () => {}
};

const mapStateToProps = state => ({
  activeScript: state.cribSheet.activeScript,
  activeFilters: state.cribSheet.activeFilters,
  currentLanguage: getActiveLanguage(state.locale).code,
  scriptSelection: state.cribSheet.scriptSelection,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(ScriptReferences);
