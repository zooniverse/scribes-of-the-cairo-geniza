import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import classnames from 'classnames';

import { toggleAnnotation, togglePopup } from '../ducks/dialog';
import {
  pressedKey, setKeyboard,
  toggleLanguage, toggleKeyboard,
  toggleModern, LANGUAGES
} from '../ducks/keyboard';
import {
  deleteSelectedAnnotation,
  unselectAnnotation, updateText
} from '../ducks/annotations';
import { toggleMarks } from '../ducks/subject-viewer';

import AnnotationKeyboard from './AnnotationKeyboard';
import FlippedBtn from './styled/FlippedBtn';
import QuestionPrompt from './QuestionPrompt';
import HelpModal from './HelpModal';
import { KeyboardOptions } from '../lib/KeyboardTypes';
import cleanText from '../lib/clean-text';
import { Utility, KEY_VALUES } from '../lib/Utility';

const ENABLE_DRAG = 'selected-annotation handle';
const DISABLE_DRAG = 'selected-annotation';

class SelectedAnnotation extends React.Component {
  constructor() {
    super();

    this.addLetterChar = this.addLetterChar.bind(this);
    this.addTextModifier = this.addTextModifier.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.closeAnnotation = this.closeAnnotation.bind(this);
    this.closePopups = this.closePopups.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
    this.deleteAnnotation = this.deleteAnnotation.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.previousScript = this.previousScript.bind(this);
    this.saveText = this.saveText.bind(this);
    this.setModern = this.setModern.bind(this);
    this.toggleKeyboardView = this.toggleKeyboardView.bind(this);
    this.toggleMarks = this.toggleMarks.bind(this);
    this.toggleScriptOptions = this.toggleScriptOptions.bind(this);
    this.toggleWhatsThis = this.toggleWhatsThis.bind(this);

    this.state = {
      disableSubmit: true,
      helpPopup: null,
      showScriptOptions: false
    };
  }

  componentDidMount() {
    let text = '';
    if (this.props.selectedAnnotation.details) {
      text = this.props.selectedAnnotation.details[0].value;
      if (text.length) {
        this.setState({ disableSubmit: false });
      }
    }
    this.inputText.value = text;
    this.inputText.focus();
    document.addEventListener('mousedown', this.closePopups, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closePopups, false);
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

  toggleMarks() {
    this.props.dispatch(toggleMarks());
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

    const advance = letter.name === 'alefLam' ? 2 : 1;
    this.inputText.setSelectionRange(startIndex + advance, startIndex + advance);

    const disableSubmit = !this.inputText.value.length;
    this.setState({ disableSubmit });
  }

  toggleKeyboardView() {
    const dimensions = { height: 275, width: 760 };
    if (!this.props.showKeyboard) {
      dimensions.height = 600;
    }
    this.props.updateSize && this.props.updateSize(dimensions);
    this.props.dispatch(toggleKeyboard());
  }

  deleteAnnotation() {
    this.props.dispatch(deleteSelectedAnnotation());
    this.props.dispatch(toggleAnnotation(null));
    this.props.dispatch(togglePopup(null));
  }

  saveText() {
    const text = (this.inputText.value && this.inputText.value.trim)
      ? this.inputText.value.trim() : '';
    if (text !== '') {
      this.props.dispatch(updateText(text));
      this.props.dispatch(toggleAnnotation(null));
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
      this.props.dispatch(toggleAnnotation(null));
    }
  }

  closePopups(e) {
    if ((this.dropdown && this.dropdown.contains(e.target)) || (this.scriptToggle && this.scriptToggle.contains(e.target))) {
      return;
    }
    if ((this.helpBox && this.helpBox.contains(e.target)) || (this[this.state.helpPopup] && this[this.state.helpPopup].contains(e.target))) {
      return;
    }
    if (this.state.helpPopup || this.state.showScriptOptions) {
      this.setState({ helpPopup: null, showScriptOptions: false });
    }
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
      this.props.dispatch(toggleAnnotation(null));
      this.props.dispatch(togglePopup(null));
    }
  }

  closePopup() {
    this.props.dispatch(togglePopup(null));
  }

  closePrompt() {
    const { translate } = this.props;
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm={translate('closeAnnotation.confirm')}
        deny={translate('closeAnnotation.deny')}
        onConfirm={this.closeAnnotation}
        onDeny={this.closePopup}
        question={translate('closeAnnotation.question')}
        title={translate('closeAnnotation.title')}
      />));
  }

  addTextModifier(type) {
    const { translate } = this.props;
    const tag = translate(`textModifiers.${type}`, null, { defaultLanguage: this.props.keyboardLocale });
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

  deletePrompt() {
    const { translate } = this.props;
    const notes = '';
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm={translate('cribSheet.confirm')}
        deny={translate('cribSheet.deny')}
        notes={notes}
        onConfirm={this.deleteAnnotation}
        onDeny={this.closePopup}
        question={translate('closeAnnotation.areYouSure')}
        title={translate('closeAnnotation.title')}
      />));
  }

  activateScript(i) {
    this.setState({ showScriptOptions: false });
    this.props.dispatch(toggleModern(true));
    this.props.dispatch(setKeyboard(i));
  }

  toggleWhatsThis(component) {
    if (this.state.helpPopup) {
      this.setState({ helpPopup: null });
    } else {
      this.setState({ helpPopup: component });
    }
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
    const { translate } = this.props;
    const removeSpace = name.replace(/\s/g, '');
    const script = `${translate(`scriptReferences.types.${removeSpace}`)}`;
    const style = `${translate(`scriptReferences.types.${type}`)}`;
    return `${script} ${style}`;
  }

  render() {
    const { translate } = this.props;
    const keyboardToggleText = this.props.showKeyboard ? translate('transcribeBox.closeKeyboard')
      : translate('transcribeBox.openKeyboard');
    let currentScript = 'Current Script';
    if (this.props.activeScript && this.props.activeScript.name && this.props.activeScript.type) {
      currentScript = this.scriptTranslate(this.props.activeScript.name, this.props.activeScript.type);
    }
    return (
      <div className={ENABLE_DRAG} ref={(c) => { this.annotationBox = c; }}>
        {this.state.helpPopup && (
          <HelpModal
            helpBox={(c) => { this.helpBox = c; }}
            questionMark={this[this.state.helpPopup]}
            text={translate(`helpModals.${this.state.helpPopup}`)}
            togglePopup={this.toggleWhatsThis}
            type={this.state.helpPopup}
          />
        )}

        <div className="selected-annotation__header">
          <div>
            <h2 className="primary-label">{translate('transcribeBox.title')}</h2>
            <hr className="plum-line" />
          </div>
          <button className="close-button" onClick={this.closePrompt}>X</button>
        </div>
        <div className="selected-annotation__instructions">
          <span>
            {this.props.currentLanguage === 'en' && (
              `The ${this.props.manuscriptLanguage} `
            )}
            {translate('transcribeBox.instructions')}
          </span>
          {this.props.manuscriptLanguage === LANGUAGES.HEBREW && (
            <span>{translate('transcribeBox.instructions2')}</span>
          )}
        </div>
        <input
          type="text"
          className="input-box"
          ref={(c) => { this.inputText = c; }}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onMouseDown={() => { this.annotationBox.className = DISABLE_DRAG; }}
          onMouseUp={() => { this.annotationBox.className = ENABLE_DRAG; }}
          placeholder={translate('transcribeBox.textArea')}
        />
        <div className="selected-annotation__text-modifiers">

          <button ref={(c) => { this.modifierHelp = c; }} onClick={this.toggleWhatsThis.bind(this, 'modifierHelp')}><i className="far fa-question-circle" /></button>
          <button onClick={this.addTextModifier.bind(this, 'insertion')}>{this.props.translate('textModifiers.insertion')}</button>
          <button onClick={this.addTextModifier.bind(this, 'deletion')}>{this.props.translate('textModifiers.deletion')}</button>
          <button onClick={this.addTextModifier.bind(this, 'damaged')}>{this.props.translate('textModifiers.damaged')}</button>
          <button onClick={this.addTextModifier.bind(this, 'drawing')}>{this.props.translate('textModifiers.drawing')}</button>
          <button onClick={this.addTextModifier.bind(this, 'grid')}>{this.props.translate('textModifiers.grid')}</button>
          {this.props.keyboardLanguage === LANGUAGES.HEBREW && (
            <button onClick={this.addTextModifier.bind(this, 'divine')}>{translate('textModifiers.divineName')}</button>
          )}
        </div>
        <div className="selected-annotation__controls">
          <div>
            <div className="round-toggle">
              <input
                id="showMarks"
                type="checkbox"
                ref={(el) => { this.showMarks = el; }}
                checked={this.props.showMarks}
                onChange={this.toggleMarks}
              />
              <label className="primary-label" htmlFor="showMarks">
                <span>{translate('transcribeBox.showPrevious')}</span>
              </label>
            </div>
            <div>
              <button className="small-btn" onClick={this.toggleKeyboardView}>{keyboardToggleText}</button>

              <button className="help-button" onClick={this.toggleWhatsThis.bind(this, 'keyboardHelp')} ref={(c) => { this.keyboardHelp = c; }}><i className="far fa-question-circle" /></button>

              {/* These buttons will be visible in Hebrew workflows as some manuscripts have both Arabic and Hebrew */}
              {this.props.manuscriptLanguage === LANGUAGES.HEBREW && (
                <div>
                  <button
                    className={classnames('small-btn', {
                      'active-btn': this.props.keyboardLocale === 'ar'
                    })}
                    onClick={this.changeLanguage.bind(this, 'Arabic')}
                  >
                    {translate('general.arabic')}
                  </button>
                  <button
                    className={classnames('small-btn', {
                      'active-btn': this.props.keyboardLocale === 'he'
                    })}
                    onClick={this.changeLanguage.bind(this, 'Hebrew')}
                  >
                    {translate('general.hebrew')}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <button className="button" onClick={this.deletePrompt}>{translate('cribSheet.delete')}</button>
            <button
              className="button button__dark"
              disabled={this.state.disableSubmit}
              onClick={this.saveText}
            >
              {translate('transcribeBox.done')}
            </button>
          </div>
        </div>
        {this.props.showKeyboard && (
          <div className="selected-annotation__keyboard-div">
            <hr />
            {this.props.keyboardLanguage === LANGUAGES.HEBREW && (
              <div>
                <div className="selected-annotation__script-select">
                  <span className="secondary-label">{translate('scriptReferences.currentScript')}</span>
                  <div>
                    <FlippedBtn rtl={this.props.rtl} onClick={this.previousScript}>&#9668;</FlippedBtn>
                    <button className="text-link" ref={(c) => { this.scriptToggle = c; }} onClick={this.toggleScriptOptions}>{currentScript}</button>
                    {this.state.showScriptOptions && (
                      <div className="script-options" ref={(c) => { this.dropdown = c; }}>
                        {KeyboardOptions.map((script, i) => this.scriptOption(script, i))}
                      </div>
                    )}
                    <FlippedBtn rtl={this.props.rtl} onClick={this.nextScript}>&#9658;</FlippedBtn>
                    <button className="help-button" onClick={this.toggleWhatsThis.bind(this, 'scriptHelp')} ref={(c) => { this.scriptHelp = c; }}><i className="far fa-question-circle" /></button>

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
                    <span>{translate('transcribeBox.showModern')}</span>
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
  currentLanguage: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  keyboardIndex: PropTypes.number,
  rtl: PropTypes.bool,
  keyboardLanguage: PropTypes.string,
  keyboardLocale: PropTypes.string,
  manuscriptLanguage: PropTypes.string,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showKeyboard: PropTypes.bool,
  showMarks: PropTypes.bool.isRequired,
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
  manuscriptLanguage: LANGUAGES.HEBREW,
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
  manuscriptLanguage: state.workflow.manuscriptLanguage,
  showKeyboard: state.keyboard.showKeyboard,
  showMarks: state.subjectViewer.showMarks,
  showModernKeyboard: state.keyboard.modern,
  selectedAnnotation: state.annotations.selectedAnnotation,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(SelectedAnnotation);
