import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  }

  render() {
    return (
      <div className="work-in-progress-popup-container">
        <div className="work-in-progress-popup">
          <hr className="pseudo-drag-bar" />
          <div className="work-in-progress-popup__content">
            <div className="work-in-progress-popup__message">
              <h2 className="h1-font">Resume Work In Progress?</h2>
              <p>
                We detected that you have some work in progress saved.
                You can continue your saved work, or start with a new page.
              </p>
            </div>
            <div className="work-in-progress-popup__controls">
              <button className="button" onClick={this.startNewWork}>New Page</button>
              <button className="button button__dark" onClick={this.resumeWorkInProgress}>Resume Work</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkInProgressPopup.propTypes = {
  dispatch: PropTypes.func,
};

WorkInProgressPopup.defaultProps = {
  dispatch: () => {},
};

export default connect()(WorkInProgressPopup);
