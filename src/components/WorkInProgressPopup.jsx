import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { togglePopup } from '../ducks/dialog';
import { WorkInProgress } from '../ducks/work-in-progress';

import StartNewWorkConfirmation from './StartNewWorkConfirmation';

class WorkInProgressPopup extends React.Component {
  constructor() {
    super();

    this.resumeWorkInProgress = this.resumeWorkInProgress.bind(this);
    this.newWorkPrompt = this.newWorkPrompt.bind(this);
  }

  resumeWorkInProgress() {
    this.props.dispatch(WorkInProgress.load());
    this.props.dispatch(togglePopup(null));
  }

  newWorkPrompt() {
    this.props.dispatch(togglePopup(
      <StartNewWorkConfirmation />
    ));
  }

  render() {
    return (
      <div className="work-in-progress-popup-container">
        <div className="work-in-progress-popup">
          <hr className="pseudo-drag-bar" />
          <div className="work-in-progress-popup__content">
            <div className="work-in-progress-popup__message">
              <h2 className="h1-font">{this.props.translate('workInProgress.header')}</h2>
              <p>
                {this.props.translate('workInProgress.message')}
              </p>
            </div>
            <div className="work-in-progress-popup__controls">
              <button className="button" onClick={this.newWorkPrompt}>{this.props.translate('workInProgress.startNewWork')}</button>
              <button className="button button__dark" onClick={this.resumeWorkInProgress}>{this.props.translate('workInProgress.resumeWorkInProgress')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkInProgressPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  translate: PropTypes.func
};

WorkInProgressPopup.defaultProps = {
  translate: () => {}
};

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale)
  };
};

export default connect(mapStateToProps)(WorkInProgressPopup);
