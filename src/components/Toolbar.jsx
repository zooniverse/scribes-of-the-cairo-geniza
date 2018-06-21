import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { toggleHints } from '../ducks/aggregations';
import { toggleDialog } from '../ducks/dialog';
import { shownStartReminder, toggleReminder } from '../ducks/reminder';
import { toggleFavorite } from '../ducks/subject';
import { toggleMarks } from '../ducks/subject-viewer';

import CollectionsContainer from '../containers/CollectionsContainer';
import FavoritesButton from './FavoritesButton';
import HelperMessage from './HelperMessage';

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
    this.toggleShowHints = this.toggleShowHints.bind(this);
    this.toggleShowMarks = this.toggleShowMarks.bind(this);

    this.state = {
      showPanel: true
    };
  }
  
  componentDidMount() { 
    this._isMounted = true;
  }

  componentWillUnmount() {
     this._isMounted = false;
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
    if (!this.props.shownBeginReminder) {
      this.props.dispatch(shownStartReminder());
    }
    if (this.props.reminder) {
      this.props.dispatch(toggleReminder(null));
    }
    if (!this.props.shownMarkReminder) {
      setTimeout(() => {
        if (this._isMounted) {
          this.toggleHelp();
        }
      }, 5000);
    }
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

  toggleShowHints() {
    this.props.dispatch(toggleHints());
  }

  toggleShowMarks() {
    this.props.dispatch(toggleMarks());
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
    this.props.dispatch(toggleDialog(
      <CollectionsContainer closePopup={this.closeDialog} />, this.props.translate('collection.title'), PANE_SIZE, 'Collections'));
  }

  closeDialog() {
    this.props.dispatch(toggleDialog(null));
  }

  toggleHelp() {
    if (!this.props.shownMarkReminder) {
      const message = 'Click at the start and end of a line of text to add a transcription (remember to start on the right side!)';
      this.props.dispatch(toggleReminder(
        <HelperMessage message={message} width={565} />
      ));
    }
  }

  render() {
    const expanded = this.state.showPanel;
    const toolbarClass = expanded ? 'toolbar toolbar__expanded' : 'toolbar';
    const hintsIcon = this.props.showHints ? 'far fa-eye-slash' : 'far fa-eye';
    const hintsText = this.props.showHints ? this.props.translate('toolbar.showHints')
      : this.props.translate('toolbar.hideHints');
    const marksIcon = this.props.showMarks ? 'fas fa-comment-dots' : 'fas fa-comment-slash';
    const marksText = this.props.showMarks ? this.props.translate('toolbar.showingMarks')
      : this.props.translate('toolbar.hidingMarks');


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
          <i className="fa fa-arrows-alt" />
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
          <i className="fa fa-redo-alt" />
          {expanded && (<span>{this.props.translate('toolbar.rotate')}</span>)}
        </button>
        <button onClick={this.invertColors}>
          <i className="fa fa-adjust" />
          {expanded && (<span>{this.props.translate('toolbar.invertColors')}</span>)}
        </button>

        <button onClick={this.toggleShowMarks}>
          <i className={marksIcon} />
          {expanded && (<span>{marksText}</span>)}
        </button>

        {this.props.aggregations && Object.keys(this.props.aggregations).length ? (
          <button onClick={this.toggleShowHints}>
            <i className={hintsIcon} />
            {expanded && (<span>{hintsText}</span>)}
          </button>
        ) : false}
        <button onClick={this.resetView}>
          <i className="fa fa-sync-alt" />
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
  aggregations: PropTypes.object,
  dispatch: PropTypes.func,
  favoriteSubject: PropTypes.bool,
  reminder: PropTypes.node,
  rotation: PropTypes.number,
  rtl: PropTypes.bool,
  scaling: PropTypes.number,
  showHints: PropTypes.bool,
  showMarks: PropTypes.bool,
  shownBeginReminder: PropTypes.bool,
  shownMarkReminder: PropTypes.bool,
  translate: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  viewerState: PropTypes.string
};

Toolbar.defaultProps = {
  aggregations: null,
  dispatch: () => {},
  favoriteSubject: false,
  reminder: null,
  rotation: 0,
  rtl: false,
  scaling: 0,
  showHints: true,
  showMarks: true,
  shownBeginReminder: false,
  shownMarkReminder: false,
  translate: () => {},
  user: null,
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const mapStateToProps = (state) => {
  const sv = state.subjectViewer;
  return {
    aggregations: state.aggregations.data,
    aggStatus: state.aggregations.status,
    currentLanguage: getActiveLanguage(state.locale).code,
    favoriteSubject: state.subject.favorite,
    reminder: state.reminder.node,
    rotation: sv.rotation,
    rtl: state.languages.rtl,
    scaling: sv.scaling,
    showHints: state.aggregations.showHints,
    showMarks: sv.showMarks,
    shownBeginReminder: state.reminder.shownBeginReminder,
    shownMarkReminder: state.reminder.shownMarkReminder,
    translate: getTranslate(state.locale),
    user: state.login.user,
    viewerState: sv.viewerState
  };
};

export default connect(mapStateToProps)(Toolbar);
