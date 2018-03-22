import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

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
    return (
      <button className="button-header" onClick={this.togglePanel}>
        {this.state.showPanel && (
          <span>{this.props.translate('toolbar.title')}</span>
        )}
        <i
          className={classnames('button-header', {
            'fa fa-chevron-left': (!this.state.showPanel && this.props.rtl) || (!this.props.rtl && this.state.showPanel),
            'fa fa-chevron-right': (this.state.showPanel && this.props.rtl) || (!this.props.rtl && !this.state.showPanel)
          })}
        />
      </button>
    );
  }

  showCollections() {
    const PANE_SIZE = { height: 300, width: 500 };
    this.props.dispatch(
      toggleDialog(<CollectionsContainer closePopup={this.closeDialog} />, this.props.translate('collection.title'), PANE_SIZE));
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
          {expanded && (<span>{this.props.translate('toolbar.addTranscription')}</span>)}
        </button>
        <button
          className={(this.props.viewerState === SUBJECTVIEWER_STATE.NAVIGATING) ? 'active' : ''}
          onClick={this.useNavigationTool}
        >
          <i className="fa fa-arrows" />
          {expanded && (<span>{this.props.translate('toolbar.pan')}</span>)}
        </button>

        <hr />

        <button onClick={this.useZoomIn}>
          <i className="fa fa-plus" />
          {expanded && (<span>{this.props.translate('toolbar.zoomIn')}</span>)}
        </button>
        <button onClick={this.useZoomOut}>
          <i className="fa fa-minus" />
          {expanded && (<span>{this.props.translate('toolbar.zoomOut')}</span>)}
        </button>
        <button onClick={this.rotateSubject}>
          <i className="fa fa-repeat" />
          {expanded && (<span>{this.props.translate('toolbar.rotate')}</span>)}
        </button>
        <button onClick={this.invertColors}>
          <i className="fa fa-adjust" />
          {expanded && (<span>{this.props.translate('toolbar.invertColors')}</span>)}
        </button>
        <button>
          <i className="fa fa-eye" />
          {expanded && (<span>{this.props.translate('toolbar.showHints')}</span>)}
        </button>
        <button onClick={this.resetView}>
          <i className="fa fa-refresh" />
          {expanded && (<span>{this.props.translate('toolbar.resetImage')}</span>)}
        </button>

        <hr />

        {this.props.user && (
          <FavoritesButton
            expanded={expanded}
            favorite={this.props.favoriteSubject}
            toggleFavorite={this.toggleFavorite}
          />
        )}

        {this.props.user && (
          <button onClick={this.showCollections}>
            <i className="fa fa-list" />
            {expanded && (<span>{this.props.translate('toolbar.addCollection')}</span>)}
          </button>
        )}

      </section>
    );
  }
}


Toolbar.propTypes = {
  dispatch: PropTypes.func,
  favoriteSubject: PropTypes.bool,
  rotation: PropTypes.number,
  rtl: PropTypes.bool,
  scaling: PropTypes.number,
  translate: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerState: PropTypes.string
};

Toolbar.defaultProps = {
  dispatch: () => {},
  favoriteSubject: false,
  rotation: 0,
  rtl: false,
  scaling: 0,
  translate: () => {},
  user: null,
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    currentLanguage: getActiveLanguage(state.locale).code,
    favoriteSubject: state.subject.favorite,
    rotation: sv.rotation,
    rtl: state.languages.rtl,
    scaling: sv.scaling,
    translate: getTranslate(state.locale),
    user: state.login.user,
    viewerState: sv.viewerState
  };
};

export default connect(mapStateToProps)(Toolbar);
