import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SnippetDeletePrompt from './SnippetDeletePrompt';
import { toggleDialog, togglePopup } from '../ducks/dialog';
import { setViewerState, SUBJECTVIEWER_STATE } from '../ducks/subject-viewer';
import { activateCard, toggleReferenceMode } from '../ducks/crib-sheet';
import { Utility } from '../lib/Utility';

const ENABLE_DRAG = 'handle active-crib-card__content';
const DISABLE_DRAG = 'active-crib-card__content';

class CribSheet extends React.Component {
  constructor() {
    super();

    this.activateCrop = this.activateCrop.bind(this);
    this.personalMode = this.personalMode.bind(this);
    this.referenceMode = this.referenceMode.bind(this);
    this.deactivateCard = this.deactivateCard.bind(this);
    this.deleteCardPrompt = this.deleteCardPrompt.bind(this);
    this.editCardText = this.editCardText.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleEditBox = this.toggleEditBox.bind(this);
    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      cardIndex: null,
      disableSave: true,
      editBox: false
    };
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

  deleteCardPrompt() {
    this.props.dispatch(togglePopup(
      <SnippetDeletePrompt cardIndex={this.state.cardIndex} preferences={this.props.preferences} />));
  }

  editCardText() {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy[this.state.cardIndex].name = this.inputText.value;
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.deactivateCard();
      this.setState({ editBox: false });
    }
  }

  toggleEditBox() {
    const editBox = !this.state.editBox;
    this.setState({ editBox });
  }

  renderReference() {
    // To be replaced with script keyboards
    return (
      <div className="crib-sheet__reference">
        <h2>Hello World</h2>
      </div>
    );
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
          <button className={!reference ? 'active-button' : ''} onClick={this.personalMode}>Your Crib Sheet</button>
        )}
        <button className={reference ? 'active-button' : ''} onClick={this.referenceMode}>Script Reference</button>
        <button className="close-button" onClick={this.close}>X</button>
        <hr className="plum-line" />
      </div>
    );
  }

  deleteItem() {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy.splice(this.state.cardIndex, 1);
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.forceUpdate();
    }
  }

  activateCard(activeCard, cardIndex) {
    this.props.dispatch(activateCard(activeCard));
    this.setState({ cardIndex });
  }

  deactivateCard() {
    this.props.dispatch(activateCard(null));
    this.setState({ cardIndex: null, editBox: false });
  }

  renderItem(snippet, i) {
    return (
      <div className="crib-sheet__item" key={`SNIPPET_${i}`}>
        <button
          className="crib-sheet__delete"
          onClick={this.deleteItem}
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

  handleInputChange() {
    const emptyField = this.inputText.value.length === 0;

    if (!emptyField && this.state.disableSave === true) {
      this.setState({ disableSave: false });
    } else if (emptyField && this.state.disableSave === false) {
      this.setState({ disableSave: true });
    }
  }

  renderActiveCard() {
    const card = this.props.activeCard;
    const editText = this.state.editBox ? 'Save' : 'Edit';
    const editFunction = this.state.editBox ? this.editCardText : this.toggleEditBox;
    const disabled = this.state.disableSave && this.state.editBox;

    return (
      <div className="active-crib-card">
        <button className="text-link" onClick={this.deactivateCard}>
          Back
        </button>

        <div className={ENABLE_DRAG} ref={(c) => { this.dialog = c; }}>
          <div>
            {card.cropUrl && (
              <div className="active-crib-card__image">
                <img alt="Your Snippet" src={card.cropUrl} />
              </div>
            )}

            {card.name && !this.state.editBox && (
              <span>{card.name}</span>
            )}

            {this.state.editBox && (
              <input
                type="text"
                ref={(c) => { this.inputText = c; }}
                onChange={this.handleInputChange}
                onMouseDown={() => { this.dialog.className = DISABLE_DRAG; }}
                onMouseUp={() => { this.dialog.className = ENABLE_DRAG; }}
                placeholder={card.name || ''}
              />
            )}
          </div>
          <div>
            <button className="button" onClick={this.deleteCardPrompt}>Delete</button>
            <button className="button button__dark" disabled={disabled} onClick={editFunction}>{editText}</button>
          </div>
        </div>
      </div>
    );
  }

  renderPersonal() {
    const cribsheet = this.props.preferences.preferences.cribsheet;

    return (
      <div className="crib-sheet__personal handle">
        <div className="crib-sheet__personal-instructions">
          <span>Use this crib sheet to save snippets for your personal reference</span>
          <span>If you&apos;re signed in, the images will be saved throughout your time on this project.</span>
        </div>

        <div className="crib-sheet__personal-content">
          {cribsheet && (
            cribsheet.map((snippet, i) => {
              return this.renderItem(snippet, i);
            })
          )}

          <div className="crib-sheet__personal-card">
            <div>
              <button onClick={this.activateCrop}>
                <span>
                  Add Image
                </span>
              </button>
            </div>
            <span className="crib-sheet__add-instructions">Click to add another image</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const cribSheet = this.props.referenceMode ?
      this.renderReference() : this.renderPersonal();

    return (
      <div className="crib-sheet">
        {this.header()}
        {this.props.activeCard && (
          this.renderActiveCard()
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
  preferences: PropTypes.shape({
    preferences: PropTypes.object,
    update: PropTypes.func
  }),
  referenceMode: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

CribSheet.defaultProps = {
  activeCard: null,
  dispatch: () => {},
  preferences: {},
  referenceMode: true,
  user: null
};

const mapStateToProps = (state) => {
  return {
    activeCard: state.cribSheet.activeCard,
    preferences: state.project.userPreferences,
    referenceMode: state.cribSheet.referenceMode,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(CribSheet);
