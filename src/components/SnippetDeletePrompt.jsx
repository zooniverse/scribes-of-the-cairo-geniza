import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { togglePopup } from '../ducks/dialog';
import { activateCard } from '../ducks/crib-sheet';

class SnippetDeletePrompt extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    if (this.props.preferences.preferences && this.props.preferences.preferences.cribsheet) {
      const cribCopy = this.props.preferences.preferences.cribsheet.slice();
      cribCopy.splice(this.props.cardIndex, 1);
      this.props.preferences.update({ 'preferences.cribsheet': cribCopy }).save();
      this.forceUpdate();
      this.props.dispatch(togglePopup(null));
      this.props.dispatch(activateCard(null));
    }
  }

  close() {
    this.props.dispatch(togglePopup(null));
  }

  render() {
    return (
      <div
        className="snippet-delete-prompt"
        onClick={this.close}
        role="presentation"
      >
        <div className="snippet-delete-prompt__content">
          <div>
            <h2>Delete</h2>
            <button className="close-button" onClick={this.close}>X</button>
          </div>
          <hr className="plum-line" />

          <div className="snippet-delete-prompt__instructions">
            <span>Delete this snippet? </span>
            <span>This action cannot be undone.</span>
          </div>

          <div>
            <button className="button" onClick={this.close}>No, cancel</button>
            <button className="button button__dark" onClick={this.onDelete}>Yes, delete</button>
          </div>
        </div>
      </div>
    );
  }
}

SnippetDeletePrompt.defaultProps = {
  cardIndex: 0,
  dispatch: () => {},
  preferences: {}
};

SnippetDeletePrompt.propTypes = {
  cardIndex: PropTypes.number,
  dispatch: PropTypes.func,
  preferences: PropTypes.shape({
    preferences: PropTypes.object,
    update: PropTypes.func
  })
};

export default connect()(SnippetDeletePrompt);
