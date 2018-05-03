import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { togglePopup } from '../ducks/dialog';
import { WorkInProgress } from '../ducks/work-in-progress';

class WorkInProgressPopup extends React.Component {
  constructor() {
    super();

    this.closePopup = this.closePopup.bind(this);
    this.resumeWorkInProgress = this.resumeWorkInProgress.bind(this);
    this.startNewWork = this.startNewWork.bind(this);
  }

  closePopup() {
    this.props.dispatch(togglePopup(null));
  }
  
  resumeWorkInProgress() {
    this.props.dispatch(WorkInProgress.load());
    this.closePopup();
  }
  
  startNewWork() {
    this.props.dispatch(WorkInProgress.clear());
    this.closePopup();
    
    //HACK  //TODO
    //Due to the new workflow selection feature, we need to trigger a series of
    //refreshes to allow the Classifier page to show the WorkflowDropdown
    //module. This requires a more elegant solution.
    window.location.reload();
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
              <button className="button" onClick={this.startNewWork}>{this.props.translate('workInProgress.startNewWork')}</button>
              <button className="button button__dark" onClick={this.resumeWorkInProgress}>{this.props.translate('workInProgress.resumeWorkInProgress')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkInProgressPopup.propTypes = {
  dispatch: PropTypes.func,
  translate: PropTypes.func,
};

WorkInProgressPopup.defaultProps = {
  dispatch: () => {},
  translate: () => {},
};

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale)
  };
};

export default connect(mapStateToProps)(WorkInProgressPopup);
