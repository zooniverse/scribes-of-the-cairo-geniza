import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleDialog } from '../ducks/dialog';
import { setViewerState, SUBJECTVIEWER_STATE } from '../ducks/subject-viewer';
import { toggleReferenceMode } from '../ducks/crib-sheet';
import { Utility } from '../lib/Utility';

class CribSheet extends React.Component {
  constructor() {
    super();

    this.activateCrop = this.activateCrop.bind(this);
    this.personalMode = this.personalMode.bind(this);
    this.referenceMode = this.referenceMode.bind(this);
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
        {/* <button className="close-button" onClick={this.close}>X</button> */}
        <hr className="plum-line" />
      </div>
    );
  }

  renderPersonal() {
    return (
      <div className="crib-sheet__personal">
        <div className="crib-sheet__personal-instructions">
          <span>Use this crib sheet to save snippets for your personal reference</span>
          <span>If you&apos;re signed in, the images will be saved throughout your time on this project.</span>
        </div>

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
    );
  }

  render() {
    const cribSheet = this.props.referenceMode ?
      this.renderReference() : this.renderPersonal();

    return (
      <div className="crib-sheet handle">
        {this.header()}
        {cribSheet}
      </div>
    );
  }
}


CribSheet.propTypes = {
  dispatch: PropTypes.func,
  referenceMode: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

CribSheet.defaultProps = {
  dispatch: () => {},
  referenceMode: true,
  user: null
};

const mapStateToProps = (state) => {
  return {
    referenceMode: state.cribSheet.referenceMode,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(CribSheet);
