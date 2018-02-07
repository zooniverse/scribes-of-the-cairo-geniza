import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CollectionsContainer from '../containers/CollectionsContainer';
import { toggleDialog } from '../ducks/dialog';
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
    this.toggleIcon = this.toggleIcon.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.useAnnotationTool = this.useAnnotationTool.bind(this);
    this.useNavigationTool = this.useNavigationTool.bind(this);
    this.showCollections = this.showCollections.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.state = {
      showPanel: false
    };
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

  toggleIcon() {
    const iconClass = this.state.showPanel ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    return (
      <button className="button-header" onClick={this.togglePanel}>
        {this.state.showPanel && (
          <span>Toolbar</span>
        )}
        <i className={`${iconClass} button-header`} />
      </button>
    );
  }

  togglePanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  useAnnotationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  }

  useNavigationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.NAVIGATING));
  }

  showCollections() {
    const PANE_SIZE = { height: 300, width: 500 };
    this.props.dispatch(
      toggleDialog(<CollectionsContainer closePopup={this.closeDialog} />, 'Add to Collections', PANE_SIZE));
  }

  closeDialog() {
    this.props.dispatch(toggleDialog(null));
  }

  render() {
    const expanded = this.state.showPanel;
    const toolbarClass = expanded ? 'toolbar toolbar__expanded' : 'toolbar';

    return (
      <section className={toolbarClass}>
        {this.toggleIcon()}

        <hr />

        <button
          className={(this.props.viewerState === SUBJECTVIEWER_STATE.ANNOTATING) ? 'active' : ''}
          onClick={this.useAnnotationTool}
        >
          <i>&#x02A01;</i>
          {expanded && (<span>Add Transcription</span>)}
        </button>
        <button
          className={(this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) ? 'active' : ''}
          onClick={this.useNavigationTool}
        >
          <i className="fa fa-arrows" />
          {expanded && (<span>Pan</span>)}
        </button>

        <hr />

        <button onClick={this.useZoomIn}>
          <i className="fa fa-plus" />
          {expanded && (<span>Zoom In</span>)}
        </button>
        <button onClick={this.useZoomOut}>
          <i className="fa fa-minus" />
          {expanded && (<span>Zoom Out</span>)}
        </button>
        <button onClick={this.rotateSubject}>
          <i className="fa fa-repeat" />
          {expanded && (<span>Rotate</span>)}
        </button>
        <button onClick={this.invertColors}>
          <i className="fa fa-adjust" />
          {expanded && (<span>Invert Colors</span>)}
        </button>
        <button>
          <i className="fa fa-eye" />
          {expanded && (<span>Toggle Previous Marks</span>)}
        </button>
        <button onClick={this.resetView}>
          <i className="fa fa-refresh" />
          {expanded && (<span>Reset Image</span>)}
        </button>

        <hr />

        <button>
          <i className="fa fa-heart-o" />
          {expanded && (<span>Add To Favorites</span>)}
        </button>

        {this.props.user && (
          <button onClick={this.showCollections}>
            <i className="fa fa-list" />
            {expanded && (<span>Add To Collection</span>)}
          </button>
        )}
      </section>
    );
  }
}


Toolbar.propTypes = {
  dispatch: PropTypes.func,
  rotation: PropTypes.number,
  scaling: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerState: PropTypes.string
};

Toolbar.defaultProps = {
  dispatch: () => {},
  rotation: 0,
  scaling: 0,
  user: null,
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    rotation: sv.rotation,
    scaling: sv.scaling,
    user: state.login.user,
    viewerState: sv.viewerState
  };
};

export default connect(mapStateToProps)(Toolbar);
