import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { activateCard } from '../ducks/crib-sheet';
import { togglePopup } from '../ducks/dialog';
import QuestionPrompt from './QuestionPrompt';

const ENABLE_DRAG = 'handle active-crib-card__content';
const DISABLE_DRAG = 'active-crib-card__content';

class ActiveCard extends React.Component {
  constructor() {
    super();

    this.deactivateCard = this.deactivateCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteCardPrompt = this.deleteCardPrompt.bind(this);
    this.editCardText = this.editCardText.bind(this);
    this.toggleEditBox = this.toggleEditBox.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      disableSave: true,
      editBox: false
    };
  }

  onDelete() {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy.splice(this.props.activeCardIndex, 1);
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.forceUpdate();
      this.props.dispatch(togglePopup(null));
      this.props.dispatch(activateCard(null));
    }
  }

  onClose() {
    this.props.dispatch(togglePopup(null));
  }

  toggleEditBox() {
    const editBox = !this.state.editBox;
    this.setState({ editBox });
  }

  editCardText() {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy[this.props.activeCardIndex].name = this.inputText.value;
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.deactivateCard();
    }
  }

  handleInputChange() {
    const emptyField = this.inputText.value.length === 0;

    if (!emptyField && this.state.disableSave === true) {
      this.setState({ disableSave: false });
    } else if (emptyField && this.state.disableSave === false) {
      this.setState({ disableSave: true });
    }
  }

  deactivateCard() {
    this.props.dispatch(activateCard(null));
  }

  deleteCardPrompt() {
    this.props.dispatch(togglePopup(
      <QuestionPrompt
        confirm={this.props.translate('cribSheet.confirm')}
        deny={this.props.translate('cribSheet.cancel')}
        notes={this.props.translate('cribSheet.deletePrompt2')}
        onConfirm={this.onClose}
        onDeny={this.onDelete}
        question={this.props.translate('cribSheet.deletePrompt')}
        title={this.props.translate('cribSheet.delete')}
      />));
  }

  render() {
    const card = this.props.activeCard;
    const editText = this.state.editBox ? this.props.translate('cribSheet.save') : this.props.translate('cribSheet.edit');
    const editFunction = this.state.editBox ? this.editCardText : this.toggleEditBox;
    const disabled = this.state.disableSave && this.state.editBox;

    return (
      <div className="active-crib-card">
        <button className="text-link" onClick={this.deactivateCard}>
          {this.props.translate('scriptReferences.back')}
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
                className="crib-sheet-input"
                ref={(c) => { this.inputText = c; }}
                onChange={this.handleInputChange}
                onMouseDown={() => { this.dialog.className = DISABLE_DRAG; }}
                onMouseUp={() => { this.dialog.className = ENABLE_DRAG; }}
                placeholder={card.name || ''}
              />
            )}
          </div>
          <div>
            <button className="button" onClick={this.deleteCardPrompt}>{this.props.translate('cribSheet.delete')}</button>
            <button className="button button__dark" disabled={disabled} onClick={editFunction}>{editText}</button>
          </div>
        </div>
      </div>
    );
  }
}

ActiveCard.propTypes = {
  activeCard: PropTypes.shape({
    cropUrl: PropTypes.string,
    name: PropTypes.string
  }),
  activeCardIndex: PropTypes.number,
  dispatch: PropTypes.func,
  preferences: PropTypes.shape({
    preferences: PropTypes.object,
    update: PropTypes.func
  }),
  translate: PropTypes.func
};

ActiveCard.defaultProps = {
  activeCard: null,
  activeCardIndex: null,
  dispatch: () => {},
  preferences: {},
  translate: () => {}
};

const mapStateToProps = (state) => {
  return {
    activeCard: state.cribSheet.activeCard,
    activeCardIndex: state.cribSheet.activeCardIndex,
    currentLanguage: getActiveLanguage(state.locale).code,
    preferences: state.project.userPreferences,
    translate: getTranslate(state.locale)
  };
};

export default connect(mapStateToProps)(ActiveCard);
