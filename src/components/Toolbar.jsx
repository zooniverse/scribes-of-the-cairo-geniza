import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CollectionsContainer from '../containers/CollectionsContainer';
import { toggleDialog } from '../ducks/dialog';
import { toggleFavorite } from '../ducks/subject';
import FavoritesButton from './FavoritesButton';

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
    this.toggleIcon = this.toggleIcon.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
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

  useAnnotationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  }

  useNavigationTool() {
    this.props.dispatch(setViewerState(SUBJECTVIEWER_STATE.NAVIGATING));
  }

  toggleFavorite() {
    this.props.dispatch(toggleFavorite());
  }

  togglePanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  toggleIcon() {
    let iconClass = this.state.showPanel ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    if (this.props.rtl) {
      iconClass = this.state.showPanel ? 'fa fa-chevron-right' : 'fa fa-chevron-left';
    }
    return (
      <button className="button-header" onClick={this.togglePanel}>
        {this.state.showPanel && (
          <span>Toolbar</span>
        )}
        <i className={`${iconClass} button-header`} />
      </button>
    );
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
    const rtlSwitch = this.props.rtl ? 'row-reverse' : 'row';
    const Button = styled.button`
      flex-direction: ${rtlSwitch};
    `;

    const expanded = this.state.showPanel;
    return (
      <section className={classnames('toolbar', {
        'toolbar__expanded': expanded, // eslint-disable-line
        'toolbar__rtl': this.props.rtl // eslint-disable-line
      })}
      >
        {this.toggleIcon()}

        <hr />

        <Button
          className={(this.props.viewerState === SUBJECTVIEWER_STATE.ANNOTATING) ? 'active' : ''}
          onClick={this.useAnnotationTool}
        >
          <i>&#x02A01;</i>
          {expanded && (<span>Add Transcription</span>)}
        </Button>
        <Button
          className={(this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) ? 'active' : ''}
          onClick={this.useNavigationTool}
        >
          <i className="fa fa-arrows" />
          {expanded && (<span>Pan</span>)}
        </Button>

        <hr />

        <Button onClick={this.useZoomIn}>
          <i className="fa fa-plus" />
          {expanded && (<span>Zoom In</span>)}
        </Button>
        <Button onClick={this.useZoomOut}>
          <i className="fa fa-minus" />
          {expanded && (<span>Zoom Out</span>)}
        </Button>
        <Button onClick={this.rotateSubject}>
          <i className="fa fa-repeat" />
          {expanded && (<span>Rotate</span>)}
        </Button>
        <Button onClick={this.invertColors}>
          <i className="fa fa-adjust" />
          {expanded && (<span>Invert Colors</span>)}
        </Button>
        <Button>
          <i className="fa fa-eye" />
          {expanded && (<span>Toggle Previous Marks</span>)}
        </Button>
        <Button onClick={this.resetView}>
          <i className="fa fa-refresh" />
          {expanded && (<span>Reset Image</span>)}
        </Button>

        <hr />

        {this.props.user && (
          <FavoritesButton
            expanded={expanded}
            favorite={this.props.favoriteSubject}
            rtl={this.props.rtl}
            toggleFavorite={this.toggleFavorite}
          />
        )}

        {this.props.user && (
          <Button onClick={this.showCollections}>
            <i className="fa fa-list" />
            {expanded && (<span>Add To Collection</span>)}
          </Button>
        )}

      </section>
    );
  }
}


Toolbar.propTypes = {
  dispatch: PropTypes.func,
  favoriteSubject: PropTypes.bool,
  rtl: PropTypes.bool,
  rotation: PropTypes.number,
  scaling: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerState: PropTypes.string
};

Toolbar.defaultProps = {
  dispatch: () => {},
  favoriteSubject: false,
  rtl: false,
  rotation: 0,
  scaling: 0,
  user: null,
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    favoriteSubject: state.subject.favorite,
    rtl: state.languages.rtl,
    rotation: sv.rotation,
    scaling: sv.scaling,
    user: state.login.user,
    viewerState: sv.viewerState
  };
};

export default connect(mapStateToProps)(Toolbar);
