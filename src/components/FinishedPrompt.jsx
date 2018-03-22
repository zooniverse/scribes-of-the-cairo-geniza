import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDialog } from '../ducks/dialog';

class FinishedPrompt extends React.Component {
  constructor() {
    super();

    this.onCancel = this.onCancel.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onDoneAndTalk = this.onDoneAndTalk.bind(this);
  }

  onCancel() {
    this.props.dispatch(toggleDialog(null));
  }

  onDone() {
    console.log('done');
  }

  onDoneAndTalk() {
    console.log('talk');
  }

  render() {
    return (
      <div className="finished-prompt handle">
        <h2 className="h1-font">Has everything been transcribed?</h2>
        <div className="finished-prompt__content">
          <span className="body-font">
            Has every line in this document been transcribed? Don&apos;t worry if
            some lines remain; your contributions are appreciated!
          </span>
          <span className="body-font">
            When you&apos;re ready, click <b>Done & Talk</b> to discuss this document
            with the Cairo Geniza research team and your fellow volunteers, or
            <b> Done</b> to go to the next document.
          </span>
        </div>
        <div className="finished-prompt__toggle">
          <div className="round-toggle">
            <input
              id="allDone"
              type="checkbox"
              ref={(el) => { this.allDone = el; }}
              defaultChecked={false}
            />
            <label className="primary-label" htmlFor="allDone">
              <span>Yes, all lines are complete</span>
            </label>
          </div>
          <div className="round-toggle">
            <input
              id="notDone"
              type="checkbox"
              ref={(el) => { this.notDone = el; }}
              defaultChecked={false}
            />
            <label className="primary-label" htmlFor="notDone">
              <span>No, some lines have not been transcribed</span>
            </label>
          </div>
        </div>
        <div className="finished-prompt__buttons">
          <button className="button" onClick={this.onCancel}>Cancel</button>
          <button className="button" onClick={this.onDone}>Done</button>
          <button className="button button__dark" onClick={this.onDoneAndTalk}>Done & Talk</button>
        </div>
      </div>
    );
  }
}

FinishedPrompt.propTypes = {
  dispatch: PropTypes.func
};

FinishedPrompt.defaultProps = {
  dispatch: () => {}
};

export default connect()(FinishedPrompt);
