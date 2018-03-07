import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleDialog, togglePopup } from '../ducks/dialog';
import { setKeyboard, toggleModern } from '../ducks/keyboard';
import {
  deleteSelectedAnnotation,
  unselectAnnotation, updateText
} from '../ducks/annotations';
import QuestionPrompt from './QuestionPrompt';
import AnnotationKeyboard from './AnnotationKeyboard';
import { KeyboardOptions } from '../lib/KeyboardTypes';

const ENABLE_DRAG = 'selected-annotation handle';
const DISABLE_DRAG = 'selected-annotation';

class SelectedAnnotation extends React.Component {
  constructor() {
    super();

    this.closeAnnotation = this.closeAnnotation.bind(this);
    this.deleteAnnotation = this.deleteAnnotation.bind(this);
    this.onTextUpdate = this.onTextUpdate.bind(this);
    this.saveText = this.saveText.bind(this);
    this.toggleKeyboard = this.toggleKeyboard.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.setModern = this.setModern.bind(this);
    this.toggleScriptOptions = this.toggleScriptOptions.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.previousScript = this.previousScript.bind(this);
    this.nextScript = this.nextScript.bind(this);

    this.state = {
      annotationText: '',
      showKeyboard: true,
      showScriptOptions: false
    };
  }

  componentDidMount() {
    let text = '';
    if (this.props.selectedAnnotation.details) {
      text = this.props.selectedAnnotation.details[0].value;
    }
    this.setState({ annotationText: text });
    this.inputText.focus();
    document.addEventListener('mousedown', this.closeDropdown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeDropdown, false);
  }

  onTextUpdate() {
    if (!this.inputText) return;

    this.setState({
      annotationText: this.inputText.value
    });
  }

  setModern() {
    this.props.dispatch(toggleModern());
  }

  toggleKeyboard() {
    const showKeyboard = !this.state.showKeyboard;
    const dimensions = { height: 250, width: 700 };
    if (showKeyboard) {
      dimensions.height = 600;
    }
    this.props.updateSize && this.props.updateSize(dimensions);
    this.setState({ showKeyboard });
  }

  deleteAnnotation() {
    this.props.dispatch(deleteSelectedAnnotation());
    this.props.dispatch(toggleDialog(null));
    this.props.dispatch(togglePopup(null));
  }

  saveText() {
    const text = (this.state.annotationText && this.state.annotationText.trim)
      ? this.state.annotationText.trim() : '';
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
    let index = this.props.keyboardIndex - 1;
    const totalItems = KeyboardOptions.length;
    if (index < 0) {
      index = totalItems - 1;
    }
    this.props.dispatch(setKeyboard(index));
  }

  nextScript() {
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
        confirm="Yes, delete"
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
        {script.name}
      </button>
    );
  }

  render() {
    const keyboardToggleText = this.state.showKeyboard ? 'Close Keyboard' : 'Show Keyboard';

    return (
      <div className={ENABLE_DRAG} ref={(c) => { this.annotationBox = c; }}>
        <div className="selected-annotation__header">
          <div>
            <h2 className="primary-label">Transcribe</h2>
            <hr className="plum-line" />
          </div>
          <button className="close-button" onClick={this.closePrompt}>X</button>
        </div>
        <div className="selected-annotation__instructions">
          <span>The Hebrew language reads from right to left, so start on the right side. </span>
          <span>Check out examples of different alphabets in the Crib Sheet.</span>
        </div>
        <input
          type="text"
          className="input-box"
          ref={(c) => { this.inputText = c; }}
          onChange={this.onTextUpdate}
          onMouseDown={() => { this.annotationBox.className = DISABLE_DRAG; }}
          onMouseUp={() => { this.annotationBox.className = ENABLE_DRAG; }}
          value={this.state.annotationText}
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
            <button className="text-link" onClick={this.toggleKeyboard}>{keyboardToggleText}</button>
          </div>
          <div>
            <button className="button" onClick={this.deletePrompt}>Delete</button>
            <button className="button button__dark" onClick={this.saveText}>Done</button>
          </div>
        </div>
        {this.state.showKeyboard && (
          <div className="selected-annotation__keyboard-div">
            <hr />
            <span className="secondary-label">Current Script Type</span>
            <div>
              <div className="selected-annotation__script-select">
                <button onClick={this.previousScript}>&#9664;</button>
                <button className="text-link" onClick={this.toggleScriptOptions}>{this.props.activeScript.name}</button>
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
                  defaultChecked={this.props.showModernKeyboard}
                  onClick={this.setModern}
                  ref={(el) => { this.modern = el; }}
                />
                <label className="primary-label" htmlFor="modern">
                  <span>Show Modern Characters</span>
                </label>
              </div>
            </div>
            <div className="selected-annotation__keyboard">
              <AnnotationKeyboard />
            </div>
          </div>
        )}
      </div>
    );
  }
}

SelectedAnnotation.propTypes = {
  activeScript: PropTypes.shape({
    name: PropTypes.string
  }),
  dispatch: PropTypes.func,
  keyboardIndex: PropTypes.number,
  selectedAnnotation: PropTypes.shape({
    details: PropTypes.array
  }),
  showModernKeyboard: PropTypes.bool,
  updateSize: PropTypes.func
};

SelectedAnnotation.defaultProps = {
  activeScript: KeyboardOptions[0],
  dispatch: () => {},
  keyboardIndex: 0,
  selectedAnnotation: null,
  showModernKeyboard: true,
  updateSize: () => {}
};

const mapStateToProps = state => ({
  activeScript: state.keyboard.activeScript,
  keyboardIndex: state.keyboard.index,
  showModernKeyboard: state.keyboard.modern,
  selectedAnnotation: state.annotations.selectedAnnotation
});

export default connect(mapStateToProps)(SelectedAnnotation);
