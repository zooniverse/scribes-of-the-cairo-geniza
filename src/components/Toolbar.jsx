import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setScaling, resetView,
  setRotation, toggleContrast,
  setViewerState,
  // setTranslation, updateViewerSize, updateImageSize,
  SUBJECTVIEWER_STATE
} from '../ducks/subject-viewer';

const ROTATION_STEP = 90;
const ZOOM_STEP = 0.1;

class Toolbar extends React.Component {
  constructor() {
    super();

    this.useZoomIn = this.useZoomIn.bind(this);
    this.useZoomOut = this.useZoomOut.bind(this);
    this.rotateSubject = this.rotateSubject.bind(this);
    this.resetView = this.resetView.bind(this);
    this.invertColors = this.invertColors.bind(this);
    this.useAnnotationTool = this.useAnnotationTool.bind(this);
    this.useNavigationTool = this.useNavigationTool.bind(this);
  }

  useZoomIn() {
    this.props.dispatch(setScaling(this.props.scaling + ZOOM_STEP));
  }

  useZoomOut() {
    this.props.dispatch(setScaling(this.props.scaling - ZOOM_STEP));
  }

  rotateSubject() {
    this.props.dispatch(setRotation(this.props.rotation + ROTATION_STEP));
  }

  resetView() {
    this.props.dispatch(resetView());
  }

  invertColors() {
    this.props.dispatch(toggleContrast());
  }

  useAnnotationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  }

  useNavigationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.NAVIGATING));
  }

  render() {
    return (
      <section className="toolbar">
        <button onClick={this.useAnnotationTool}>&#x02A01;</button>
        <button onClick={this.useNavigationTool}><i className="fa fa-arrows" /></button>

        <hr />

        <button onClick={this.useZoomIn}><i className="fa fa-plus" /></button>
        <button onClick={this.useZoomOut}><i className="fa fa-minus" /></button>
        <button onClick={this.rotateSubject}><i className="fa fa-repeat" /></button>
        <button onClick={this.invertColors}><i className="fa fa-adjust" /></button>
        <button><i className="fa fa-eye" /></button>
        <button onClick={this.resetView}><i className="fa fa-refresh" /></button>

        <hr />

        <button><i className="fa fa-heart-o" /></button>
        <button><i className="fa fa-list" /></button>
      </section>
    );
  }
}


Toolbar.propTypes = {
  dispatch: PropTypes.func,
  rotation: PropTypes.number,
  scaling: PropTypes.number
};

Toolbar.defaultProps = {
  dispatch: () => {},
  rotation: 0,
  scaling: 0
};

const mapStateToProps = (state) => ({
  rotation: state.subjectViewer.rotation,
  scaling: state.subjectViewer.scaling
});

export default connect(mapStateToProps)(Toolbar);
