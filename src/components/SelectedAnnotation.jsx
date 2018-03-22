import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { toggleDialog, togglePopup } from '../ducks/dialog';
import { pressedKey, setKeyboard, toggleKeyboard, toggleModern } from '../ducks/keyboard';
import {
  deleteSelectedAnnotation,
  unselectAnnotation, updateText
} from '../ducks/annotations';
import QuestionPrompt from './QuestionPrompt';
import AnnotationKeyboard from './AnnotationKeyboard';
import { KeyboardOptions } from '../lib/KeyboardTypes';
import { Utility, KEY_VALUES } from '../lib/Utility';

const ENABLE_DRAG = 'selected-annotation handle';
const DISABLE_DRAG = 'selected-annotation';

class SelectedAnnotation extends React.Component {
  constructor() {
    super();

    this.closeAnnotation = this.closeAnnotation.bind(this);
    this.deleteAnnotation = this.deleteAnnotation.bind(this);
    this.saveText = this.saveText.bind(this);
    this.toggleKeyboardView = this.toggleKeyboardView.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.setModern = this.setModern.bind(this);
    this.toggleScriptOptions = this.toggleScriptOptions.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.previousScript = this.previousScript.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.addHebrewLetter = this.addHebrewLetter.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.state = {
      showScriptOptions: false
    };
  }

  componentDidMount() {
    let text = '';
    if (this.props.selectedAnnotation.details) {
      text = this.props.selectedAnnotation.details[0].value;
    }
    this.inputText.value = text;
    this.inputText.focus();
    document.addEventListener('mousedown', this.closeDropdown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeDropdown, false);
  }

  onKeyUp(e) {
    const character = Utility.getHebrewChar(e);

    if (character !== false) {
      this.props.dispatch(pressedKey(null));
    }
  }

  onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return;
    }
    const character = Utility.getHebrewChar(e);

    if (Utility.getKeyCode(e) === KEY_VALUES.Enter) {
      this.saveText();
    }

    if (Utility.getKeyCode(e) === KEY_VALUES.Escape) {
      this.closePrompt();
    }

    if (character !== false) {
      e.preventDefault();
      this.addHebrewLetter(character);
      this.props.dispatch(pressedKey(character.name));
    }
  }

  setModern() {
    this.props.dispatch(toggleModern());
  }

  addHebrewLetter(letter) {
    if (!this.inputText) return;
    const text = this.inputText.value;
    const startIndex = this.inputText.selectionStart;
    const endIndex = this.inputText.selectionEnd;

    const startText = text.substring(0, startIndex);
    const endText = text.substring(endIndex);

    this.inputText.value = startText + letter.unicode + endText;
    this.inputText.focus();
    this.inputText.setSelectionRange(startIndex + 1, startIndex + 1);
  }

  toggleKeyboardView() {
    const dimensions = { height: 250, width: 700 };
    if (!this.props.showKeyboard) {
      dimensions.height = 600;
    }
    this.props.updateSize && this.props.updateSize(dimensions);
    this.props.dispatch(toggleKeyboard());
  }

  deleteAnnotation() {
    this.props.dispatch(deleteSelectedAnnotation());
    this.props.dispatch(toggleDialog(null));
    this.props.dispatch(togglePopup(null));
  }

  saveText() {
    const text = (this.inputText.value && this.inputText.value.trim)
      ? this.inputText.value.trim() : '';
    if (text !== '') {
      this.props.dispatch(updateText(text));
      this.props.dispatch(toggleDialog(null));
      this.props.dispatch(unselectAnnotation());
    } else {
      this.deletePrompt(true);
    }
  }

  cancelAnnotation() {
    const initialAnnotationText =
      (this.props.selectedAnnotation && this.props.selectedAnnotation.details &&
        this.props.selectedAnnotation.details[0] && this.props.selectedAnnotation.details[0].value)
        ? this.props.selectedAnnotation.details[0].value : '';
    if (initialAnnotationText.trim().length === 0) {
      this.deleteAnnotation();
    } else {
      this.props.dispatch(unselectAnnotation());
      this.props.dispatch(toggleDialog(null));
    }
  }

  closeDropdown(e) {
    if (this.dropdown && this.dropdown.contains(e.target)) {
      return;
    }
    this.setState({ showScriptOptions: false });
  }

  closeAnnotation() {
    if (this.props.selectedAnnotation && this.props.selectedAnnotation.details &&
    this.props.selectedAnnotation.details[0] && !this.props.selectedAnnotation.details[0].value) {
      this.deletePrompt(true);
    } else {
      this.props.dispatch(unselectAnnotation());
      this.props.dispatch(toggleDialog(null));
      this.props.dispatch(togglePopup(null));
    }
  }

  closePopup() {
    this.props.dispatch(togglePopup(null));
  }

  closePrompt() {
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm="Yes, close without saving"
        deny="No, continue transcribing"
        onConfirm={this.closeAnnotation}
        onDeny={this.closePopup}
        question="Are you sure you want to close without saving?"
        title="Close Annotation"
      />));
  }

  toggleScriptOptions() {
    this.setState({ showScriptOptions: !this.state.showScriptOptions });
  }

  previousScript() {
    this.props.dispatch(toggleModern(true));
    let index = this.props.keyboardIndex - 1;
    const totalItems = KeyboardOptions.length;
    if (index < 0) {
      index = totalItems - 1;
    }
    this.props.dispatch(setKeyboard(index));
  }

  nextScript() {
    this.props.dispatch(toggleModern(true));
    let index = this.props.keyboardIndex + 1;
    const totalItems = KeyboardOptions.length;
    if (index >= totalItems) {
      index = 0;
    }
    this.props.dispatch(setKeyboard(index));
  }

  deletePrompt(emptyText = false) {
    const notes = emptyText ? 'You cannot save an empty transcription.' : '';
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm={this.props.translate('cribSheet.confirm')}
        deny="No, continue transcribing"
        notes={notes}
        onConfirm={this.deleteAnnotation}
        onDeny={this.closePopup}
        question="Are you sure you want to delete this transcription?"
        title="Close Annotation"
      />));
  }

  activateScript(i) {
    this.setState({ showScriptOptions: false });
    this.props.dispatch(toggleModern(true));
    this.props.dispatch(setKeyboard(i));
  }

  scriptOption(script, i) {
    const isActive = this.props.activeScript === script ? 'active-script-option' : '';
    return (
      <button
        key={`SCRIPT_OPTION_${i}`}
        className={isActive}
        onClick={this.activateScript.bind(this, i)}
      >
        {script.name} {script.type}
      </button>
    );
  }

  render() {
    const keyboardToggleText = this.props.showKeyboard ? this.props.translate('transcribeBox.closeKeyboard') : this.props.translate('transcribeBox.openKeyboard');
    let currentScript = 'Current Script';
    if (this.props.activeScript && this.props.activeScript.name && this.props.activeScript.type) {
      currentScript = `${this.props.activeScript.name} ${this.props.activeScript.type}`;
    }
    return (
      <div className={ENABLE_DRAG} ref={(c) => { this.annotationBox = c; }}>
        <div className="selected-annotation__header">
          <div>
            <h2 className="primary-label">{this.props.translate('transcribeBox.title')}</h2>
            <hr className="plum-line" />
          </div>
          <button className="close-button" onClick={this.closePrompt}>X</button>
        </div>
        <div className="selected-annotation__instructions">
          <span>{this.props.translate('transcribeBox.instructions')}</span>
          <span>{this.props.translate('transcribeBox.instructions2')}</span>
        </div>
        <input
          type="text"
          className="input-box"
          ref={(c) => { this.inputText = c; }}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onMouseDown={() => { this.annotationBox.className = DISABLE_DRAG; }}
          onMouseUp={() => { this.annotationBox.className = ENABLE_DRAG; }}
          placeholder={this.props.translate('transcribeBox.textArea')}
        />
        <div className="selected-annotation__controls">
          <div>
            <div className="round-toggle">
              <input
                id="showMarks"
                type="checkbox"
                ref={(el) => { this.showMarks = el; }}
                defaultChecked={false}
              />
              <label className="primary-label" htmlFor="showMarks">
                <span>Show Previous Marks</span>
              </label>
            </div>
            <button className="text-link" onClick={this.toggleKeyboardView}>{keyboardToggleText}</button>
          </div>
          <div>
            <button className="button" onClick={this.deletePrompt}>{this.props.translate('cribSheet.delete')}</button>
            <button className="button button__dark" onClick={this.saveText}>{this.props.translate('transcribeBox.done')}</button>
          </div>
        </div>
        {this.props.showKeyboard && (
          <div className="selected-annotation__keyboard-div">
            <hr />
            <span className="secondary-label">Current Script Type</span>
            <div>
              <div className="selected-annotation__script-select">
                <button onClick={this.previousScript}>&#9664;</button>
                <button className="text-link" onClick={this.toggleScriptOptions}>{currentScript}</button>
                {this.state.showScriptOptions && (
                  <div className="script-options" ref={(c) => { this.dropdown = c; }}>
                    {KeyboardOptions.map((script, i) => this.scriptOption(script, i))}
                  </div>
                )}
                <button onClick={this.nextScript}>&#9658;</button>
              </div>
              <div className="round-toggle">
                <input
                  id="modern"
                  type="checkbox"
                  checked={this.props.showModernKeyboard}
                  onChange={this.setModern}
                  ref={(el) => { this.modern = el; }}
                />
                <label className="primary-label" htmlFor="modern">
                  <span>Show Modern Characters</span>
                </label>
              </div>
            </div>
            <div className="selected-annotation__keyboard">
              <AnnotationKeyboard onLetterClick={this.addHebrewLetter} onEnter={this.saveText} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

SelectedAnnotation.propTypes = {
  activeScript: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }),
  dispatch: PropTypes.func,
  keyboardIndex: PropTypes.number,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showKeyboard: PropTypes.bool,
  showModernKeyboard: PropTypes.bool,
  translate: PropTypes.func,
  updateSize: PropTypes.func
};

SelectedAnnotation.defaultProps = {
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  keyboardIndex: 0,
  selectedAnnotation: null,
  showKeyboard: true,
  showModernKeyboard: true,
  translate: () => {},
  updateSize: () => {}
};

const mapStateToProps = state => ({
  activeScript: state.keyboard.activeScript,
  currentLanguage: getActiveLanguage(state.locale).code,
  keyboardIndex: state.keyboard.index,
  showKeyboard: state.keyboard.showKeyboard,
  showModernKeyboard: state.keyboard.modern,
  selectedAnnotation: state.annotations.selectedAnnotation,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(SelectedAnnotation);
