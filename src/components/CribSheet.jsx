import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { toggleDialog } from '../ducks/dialog';
import { setViewerState, SUBJECTVIEWER_STATE } from '../ducks/subject-viewer';
import { activateCard, toggleReferenceMode } from '../ducks/crib-sheet';
import { LANGUAGES } from '../ducks/keyboard';
import { Utility } from '../lib/Utility';
import ActiveCard from './ActiveCard';
import ScriptReferences from './ScriptReferences';

class CribSheet extends React.Component {
  constructor() {
    super();

    this.activateCrop = this.activateCrop.bind(this);
    this.personalMode = this.personalMode.bind(this);
    this.referenceMode = this.referenceMode.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.close = this.close.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleDialog(null));
  }

  close(e) {
    this.onClose();
    return Utility.stopEvent(e);
  }

  activateCrop(e) {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.CROPPING));
    this.close(e);
  }

  personalMode() {
    this.props.dispatch(toggleReferenceMode(false));
  }

  referenceMode() {
    this.props.dispatch(toggleReferenceMode(true));
  }

  header() {
    const reference = this.props.referenceMode;

    return (
      <div className="crib-sheet__header handle">
        {this.props.user && (
          <button className={!reference ? 'active-button' : ''} onClick={this.personalMode}>{this.props.translate('scriptReferences.yourSheet')}</button>
        )}
        {this.props.keyboardLanguage === LANGUAGES.HEBREW && (
          <button className={reference ? 'active-button' : ''} onClick={this.referenceMode}>{this.props.translate('scriptReferences.title')}</button>
        )}
        <button className="close-button" onClick={this.close}>X</button>
        <hr className="plum-line" />
      </div>
    );
  }

  deleteItem(i = this.state.cardIndex) {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy.splice(i, 1);
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.forceUpdate();
    }
  }

  activateCard(activeCard, cardIndex) {
    this.props.dispatch(activateCard(activeCard, cardIndex));
  }

  renderItem(snippet, i) {
    return (
      <div className="crib-sheet__item" key={`SNIPPET_${i}`}>
        <button
          className="crib-sheet__delete"
          onClick={this.deleteItem.bind(this, i)}
        >
          <i className="fa fa-times" />
        </button>

        <button
          className="crib-sheet__card"
          onClick={this.activateCard.bind(this, snippet, i)}
        >
          {snippet.cropUrl && (
            <img alt="Crib Sheet Snippet" src={snippet.cropUrl} />
          )}
          <span>
            {snippet.name}
          </span>
        </button>

      </div>
    );
  }

  renderInstructions() {
    return (
      <div className="crib-sheet__personal-instructions handle">
        <span>{this.props.translate('cribSheet.instructions')}</span>
        <span>{this.props.translate('cribSheet.instructions2')}</span>
      </div>
    );
  }

  renderPersonal() {
    const cribsheet = (this.props.preferences && this.props.preferences.preferences)
      ? this.props.preferences.preferences.cribsheet : null;

    return (
      <div className="crib-sheet__personal handle">
        <div className="crib-sheet__personal-content">
          {cribsheet && (
            cribsheet.map((snippet, i) => {
              return this.renderItem(snippet, i);
            })
          )}

          <div className="crib-sheet__personal-card">
            <div>
              <button onClick={this.activateCrop}>
                <span>{this.props.translate('cribSheet.addImage')}</span>
              </button>
            </div>
            <span className="crib-sheet__add-instructions">{this.props.translate('cribSheet.clickAdd')}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const cribSheet = this.props.referenceMode && this.props.keyboardLanguage === LANGUAGES.HEBREW ?
      <ScriptReferences /> : this.renderPersonal();

    return (
      <div className="crib-sheet">
        {this.header()}
        {!this.props.referenceMode && (
          this.renderInstructions()
        )}

        {this.props.activeCard && (
          <ActiveCard />
        )}

        {!this.props.activeCard && (
          cribSheet
        )}
      </div>
    );
  }
}

CribSheet.propTypes = {
  activeCard: PropTypes.shape({
    cropUrl: PropTypes.string,
    name: PropTypes.string
  }),
  dispatch: PropTypes.func,
  keyboardLanguage: PropTypes.string,
  preferences: PropTypes.shape({
    preferences: PropTypes.object,
    update: PropTypes.func
  }),
  referenceMode: PropTypes.bool,
  translate: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

CribSheet.defaultProps = {
  activeCard: null,
  dispatch: () => {},
  keyboardLanguage: LANGUAGES.HEBREW,
  preferences: {},
  referenceMode: true,
  translate: () => {},
  user: null
};

const mapStateToProps = (state) => {
  return {
    activeCard: state.cribSheet.activeCard,
    currentLanguage: getActiveLanguage(state.locale).code,
    keyboardLanguage: state.keyboard.activeLanguage,
    preferences: state.project.userPreferences,
    referenceMode: state.cribSheet.referenceMode,
    translate: getTranslate(state.locale),
    user: state.login.user
  };
};

export default connect(mapStateToProps)(CribSheet);
