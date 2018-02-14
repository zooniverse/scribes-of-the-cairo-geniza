import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSubjectLocation } from '../lib/get-subject-location';
import { toggleDialog } from '../ducks/dialog';

const ENABLE_DRAG = 'handle save-snippet';
const DISABLE_DRAG = 'save-snippet';

class SaveClip extends React.Component {
  constructor(props) {
    super(props);

    this.saveClip = this.saveClip.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleDialog(null));
  }

  cropUrl() {
    if (!this.props.points) return null;
    const { width, height, x, y } = this.props.points;
    const imageSrc = getSubjectLocation(this.props.subject, this.props.frame).src;
    const url = imageSrc.replace(/^https?\:\/\//i, '');
    return `https://imgproc.zooniverse.org/crop/?w=${width}&h=${height}&x=${x}&y=${y}&u=${url}`;
  }

  saveClip(e) {
    let newCribsheet;
    const prefs = this.props.preferences;
    const clip = {
      cropUrl: this.cropUrl(),
      height: this.props.points.height,
      name: this.inputText.value,
      original: {
        location: this.props.subject.locations[this.props.frame],
        subject_id: this.props.subjectID
      },
      width: this.props.points.width,
      x: this.props.points.x,
      y: this.props.points.y
    };

    if (prefs) {
      if (!prefs.preferences.cribsheet) {
        newCribsheet = [clip];
      } else {
        const copied = prefs.preferences.cribsheet.slice();
        copied.push(clip);
        newCribsheet = copied;
      }
    }
    prefs.update({ 'preferences.cribsheet': newCribsheet }).save();
    this.onClose();
  }

  render() {
    return (
      <div className={ENABLE_DRAG} ref={(c) => { this.dialog = c; }}>
        <div className="save-snippet__image">
          <img alt="Your saved snippet" src={this.cropUrl()} />
        </div>
        <input
          type="text"
          ref={(c) => { this.inputText = c; }}
          onMouseDown={() => { this.dialog.className = DISABLE_DRAG; }}
          onMouseUp={() => { this.dialog.className = ENABLE_DRAG; }}
          placeholder="Snippet Description"
        />

        <div className="save-snippet__buttons">
          <button className="button" onClick={this.onClose}>Cancel</button>
          <button className="button button__dark" onClick={this.saveClip}>Save</button>
        </div>

      </div>
    );
  }
}

SaveClip.defaultProps = {
  dispatch: () => {},
  frame: 0,
  preferences: null,
  points: null,
  subject: null,
  subjectID: ''
};

SaveClip.propTypes = {
  dispatch: PropTypes.func,
  frame: PropTypes.number,
  preferences: PropTypes.shape({
    preferences: PropTypes.object
  }),
  points: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number
  }),
  subject: PropTypes.shape({
    locations: PropTypes.array
  }),
  subjectID: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    subject: state.subject.currentSubject,
    frame: state.subjectViewer.frame,
    preferences: state.project.userPreferences,
    subjectID: state.subject.id
  };
};

export default connect(mapStateToProps)(SaveClip);
