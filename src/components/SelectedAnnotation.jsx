import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage, Translate } from 'react-localize-redux';
import classnames from 'classnames';

import { toggleDialog, togglePopup } from '../ducks/dialog';
import {
  pressedKey, setKeyboard,
  toggleLanguage, toggleKeyboard,
  toggleModern, LANGUAGES
} from '../ducks/keyboard';
import {
  deleteSelectedAnnotation,
  unselectAnnotation, updateText
} from '../ducks/annotations';

import QuestionPrompt from './QuestionPrompt';
import AnnotationKeyboard from './AnnotationKeyboard';
import FlippedBtn from './styled/FlippedBtn';
import { KeyboardOptions } from '../lib/KeyboardTypes';
import cleanText from '../lib/clean-text';
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
    this.addLetterChar = this.addLetterChar.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.addTextModifier = this.addTextModifier.bind(this);

    this.state = {
      disableSubmit: true,
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

  onKeyUp() {
    if (this.props.activeKey) {
      this.props.dispatch(pressedKey(null));
    }

    const disableSubmit = !this.inputText.value.length;
    this.setState({ disableSubmit });
  }

  onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return;
    }
    const character = Utility.getLangChar(e, this.props.keyboardLanguage);

    if (Utility.getKeyCode(e) === KEY_VALUES.Enter) {
      this.saveText();
    }

    if (Utility.getKeyCode(e) === KEY_VALUES.Escape) {
      this.closePrompt();
    }

    if (Utility.getKeyCode(e) === KEY_VALUES.Space) {
      this.props.dispatch(pressedKey('space'));
    }

    if (character !== false) {
      e.preventDefault();
      this.addLetterChar(character);
      this.props.dispatch(pressedKey(character.name));
    }
  }

  setModern() {
    this.props.dispatch(toggleModern());
  }

  addLetterChar(letter = null) {
    if (!this.inputText) return;
    const character = (letter && letter.character) || ' ';
    const text = this.inputText.value;
    const startIndex = this.inputText.selectionStart;
    const endIndex = this.inputText.selectionEnd;

    const startText = text.substring(0, startIndex);
    const endText = text.substring(endIndex);

    this.inputText.value = startText + character + endText;
    this.inputText.focus();
    this.inputText.setSelectionRange(startIndex + 1, startIndex + 1);

    const disableSubmit = !this.inputText.value.length;
    this.setState({ disableSubmit });
  }

  toggleKeyboardView() {
    const dimensions = { height: 250, width: 760 };
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

  changeLanguage(language) {
    this.props.dispatch(toggleLanguage(language));
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
        confirm={this.props.translate('closeAnnotation.confirm')}
        deny={this.props.translate('closeAnnotation.deny')}
        onConfirm={this.closeAnnotation}
        onDeny={this.closePopup}
        question={this.props.translate('closeAnnotation.question')}
        title={this.props.translate('closeAnnotation.title')}
      />));
  }

  addTextModifier(type) {
    const tag = this.props.translate(`textModifiers.${type}`, null, { defaultLanguage: this.props.keyboardLocale });
    let value;
    let textAfter;
    let textInBetween;
    const wrapperTags = ['insertion', 'deletion', 'grid'];

    const startTag = `[${tag}]`;
    const endTag = `[/${tag}]`;
    const text = this.inputText;
    const textAreaValue = text.value;
    const selectionStart = text.selectionStart;
    const selectionEnd = text.selectionEnd;
    const textBefore = textAreaValue.substring(0, selectionStart);
    if (selectionStart === selectionEnd) {
      textAfter = textAreaValue.substring(selectionStart, textAreaValue.length);
      if (wrapperTags.indexOf(type) < 0) {
        value = textBefore + startTag + textAfter;
      } else {
        value = textBefore + startTag + endTag + textAfter;
      }
    } else {
      textInBetween = textAreaValue.substring(selectionStart, selectionEnd);
      textAfter = textAreaValue.substring(selectionEnd, textAreaValue.length);
      if (wrapperTags.indexOf(type) < 0) {
        value = textBefore + endTag + textInBetween + textAfter;
      } else {
        value = textBefore + startTag + textInBetween + endTag + textAfter;
      }
    }
    this.inputText.value = cleanText(value, tag, type);
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
    const notes = '';
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm={this.props.translate('cribSheet.confirm')}
        deny={this.props.translate('cribSheet.deny')}
        notes={notes}
        onConfirm={this.deleteAnnotation}
        onDeny={this.closePopup}
        question="Are you sure you want to delete this transcription?"
        title={this.props.translate('closeAnnotation.title')}
      />));
  }

  activateScript(i) {
    this.setState({ showScriptOptions: false });
    this.props.dispatch(toggleModern(true));
    this.props.dispatch(setKeyboard(i));
  }

  scriptOption(script, i) {
    const isActive = this.props.activeScript === script ? 'active-script-option' : '';
    const scriptName = this.scriptTranslate(script.name, script.type);
    return (
      <button
        key={`SCRIPT_OPTION_${i}`}
        className={isActive}
        onClick={this.activateScript.bind(this, i)}
      >
        {scriptName}
      </button>
    );
  }

  scriptTranslate(name, type) {
    const removeSpace = name.replace(/\s/g, '');
    const script = `${this.props.translate(`scriptReferences.types.${removeSpace}`)}`;
    const style = `${this.props.translate(`scriptReferences.types.${type}`)}`;
    return `${script} ${style}`;
  }

  render() {
    const keyboardToggleText = this.props.showKeyboard ? this.props.translate('transcribeBox.closeKeyboard')
      : this.props.translate('transcribeBox.openKeyboard');
    let currentScript = 'Current Script';
    if (this.props.activeScript && this.props.activeScript.name && this.props.activeScript.type) {
      currentScript = this.scriptTranslate(this.props.activeScript.name, this.props.activeScript.type);
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
        <div className="selected-annotation__text-modifiers">
          <button onClick={this.addTextModifier.bind(this, 'insertion')}>{this.props.translate('textModifiers.insertion')}</button>
          <button onClick={this.addTextModifier.bind(this, 'deletion')}>{this.props.translate('textModifiers.deletion')}</button>
          <button onClick={this.addTextModifier.bind(this, 'damaged')}>{this.props.translate('textModifiers.damaged')}</button>
          <button onClick={this.addTextModifier.bind(this, 'drawing')}>{this.props.translate('textModifiers.drawing')}</button>
          <button onClick={this.addTextModifier.bind(this, 'grid')}>{this.props.translate('textModifiers.grid')}</button>
          {this.props.keyboardLanguage === LANGUAGES.HEBREW && (
            <button onClick={this.addTextModifier.bind(this, 'divine')}>{this.props.translate('textModifiers.divineName')}</button>
          )}
        </div>
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
            <div>
              <button className="text-link" onClick={this.toggleKeyboardView}>{keyboardToggleText}</button>
              {/* These buttons will always be visible as some manuscripts have both Arabic and Hebrew */}
              <button
                className={classnames('lang-btn', {
                  'active-btn': this.props.keyboardLocale === 'ar'
                })}
                onClick={this.changeLanguage.bind(this, 'Arabic')}
              >
                Arabic
              </button>
              <button
                className={classnames('lang-btn', {
                  'active-btn': this.props.keyboardLocale === 'he'
                })}
                onClick={this.changeLanguage.bind(this, 'Hebrew')}
              >
                Hebrew
              </button>
            </div>
          </div>
          <div>
            <button className="button" onClick={this.deletePrompt}>{this.props.translate('cribSheet.delete')}</button>
            <button className="button button__dark" disabled={this.state.disableSubmit} onClick={this.saveText}>{this.props.translate('transcribeBox.done')}</button>
          </div>
        </div>
        {this.props.showKeyboard && (
          <div className="selected-annotation__keyboard-div">
            <hr />
            {this.props.keyboardLanguage === LANGUAGES.HEBREW && (
              <div>
                <div className="selected-annotation__script-select">
                  <span className="secondary-label">{this.props.translate('scriptReferences.currentScript')}</span>
                  <div>
                    <FlippedBtn rtl={this.props.rtl} onClick={this.previousScript}>&#9668;</FlippedBtn>
                    <button className="text-link" onClick={this.toggleScriptOptions}>{currentScript}</button>
                    {this.state.showScriptOptions && (
                      <div className="script-options" ref={(c) => { this.dropdown = c; }}>
                        {KeyboardOptions.map((script, i) => this.scriptOption(script, i))}
                      </div>
                    )}
                    <FlippedBtn rtl={this.props.rtl} onClick={this.nextScript}>&#9658;</FlippedBtn>
                  </div>
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
                    <span>{this.props.translate('transcribeBox.showModern')}</span>
                  </label>
                </div>
              </div>
            )}
            <div className="selected-annotation__keyboard">
              <AnnotationKeyboard onLetterClick={this.addLetterChar} onEnter={this.saveText} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

SelectedAnnotation.propTypes = {
  activeKey: PropTypes.string,
  activeScript: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }),
  dispatch: PropTypes.func,
  keyboardIndex: PropTypes.number,
  rtl: PropTypes.bool,
  keyboardLanguage: PropTypes.string,
  keyboardLocale: PropTypes.string,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showKeyboard: PropTypes.bool,
  showModernKeyboard: PropTypes.bool,
  translate: PropTypes.func,
  updateSize: PropTypes.func
};

SelectedAnnotation.defaultProps = {
  activeKey: null,
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  keyboardIndex: 0,
  rtl: false,
  keyboardLanguage: LANGUAGES.HEBREW,
  keyboardLocale: 'he',
  selectedAnnotation: null,
  showKeyboard: true,
  showModernKeyboard: true,
  translate: () => {},
  updateSize: () => {}
};

const mapStateToProps = state => ({
  activeKey: state.keyboard.activeKey,
  activeScript: state.keyboard.activeScript,
  currentLanguage: getActiveLanguage(state.locale).code,
  keyboardIndex: state.keyboard.index,
  rtl: state.languages.rtl,
  keyboardLanguage: state.keyboard.activeLanguage,
  keyboardLocale: state.keyboard.locale,
  showKeyboard: state.keyboard.showKeyboard,
  showModernKeyboard: state.keyboard.modern,
  selectedAnnotation: state.annotations.selectedAnnotation,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(SelectedAnnotation);
