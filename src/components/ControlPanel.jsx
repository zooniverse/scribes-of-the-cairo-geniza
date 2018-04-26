import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Tutorial } from 'zooniverse-react-components';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { fetchGuide } from '../ducks/field-guide';
import { toggleDialog, togglePopup } from '../ducks/dialog';
import { changeFrame } from '../ducks/subject-viewer';
import {
  WorkInProgress, WORKINPROGRESS_INITIAL_STATE, WORKINPROGRESS_PROPTYPES,
  getWorkInProgressStateValues
} from '../ducks/work-in-progress';
import { fetchTutorial, TUTORIAL_STATUS } from '../ducks/tutorial';

import FieldGuide from './FieldGuide';
import CribSheet from './CribSheet';
import TutorialView from './TutorialView';
import FinishedPrompt from './FinishedPrompt';
import FlippedControlPanel from './styled/FlippedControlPanel';
import WorkInProgressPopup from './WorkInProgressPopup';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
    this.toggleFieldGuide = this.toggleFieldGuide.bind(this);
    this.fetchTutorial = this.fetchTutorial.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleCribSheet = this.toggleCribSheet.bind(this);
    this.toggleTutorial = this.toggleTutorial.bind(this);
    this.finishedPrompt = this.finishedPrompt.bind(this);

    this.state = {
      showPanel: true,
      showInfo: true
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchGuide());
  }

  componentDidMount() {
    this.fetchTutorial(this.props);
    
    //Check if the user has any work in progress.
    //componentDidMount() checks when the user accesses the Classifier page from another page, e.g. the Home page. 
    if (this.props.user && WorkInProgress.check(this.props.user)) {
      this.props.dispatch(togglePopup(<WorkInProgressPopup />));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTutorial(nextProps);

    //If there's new tutorial data, show it...
    //...unless there's a WorkInProgress prompt in the way.
    if (nextProps.tutorial !== this.props.tutorial && !WorkInProgress.check(this.props.user)) {
      Tutorial.checkIfCompleted(nextProps.tutorial, nextProps.user, nextProps.preferences).then((completed) => {
        if (!completed) { this.toggleTutorial(); }
      });
    }
    
    //Check if the user has any work in progress.
    //componentWillReceiveProps() checks when the user accesses the Classifier page directly. 
    if (this.props.user !== nextProps.user && nextProps.user && WorkInProgress.check(nextProps.user)) {
      this.props.dispatch(togglePopup(<WorkInProgressPopup />));
    }
    
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleFieldGuide() {
    if (this.props.dialogComponent === 'FieldGuide') {
      return this.props.dispatch(toggleDialog(null));
    }
    return this.props.dispatch(toggleDialog(
      <FieldGuide guide={this.props.guide} icons={this.props.icons} />, this.props.translate('fieldGuide.title'), undefined, 'FieldGuide'));
  }

  toggleCribSheet() {
    if (this.props.dialogComponent === 'CribSheet') {
      return this.props.dispatch(toggleDialog(null));
    }
    const dimensions = { height: 650, width: 710 };
    return this.props.dispatch(toggleDialog(<CribSheet />, '', dimensions, 'CribSheet'));
  }

  toggleTutorial() {
    if (this.props.dialogComponent === 'Tutorial') {
      this.props.dispatch(togglePopup(null));
    }

    if (this.props.tutorial) {
      this.props.dispatch(togglePopup(<TutorialView />));
    }
  }

  fetchTutorial(props) {
    if (props.workflow && props.preferences && props.tutorialStatus === TUTORIAL_STATUS.IDLE) {
      this.props.dispatch(fetchTutorial(props.workflow));
    }
  }

  handleResize() {
    if (window.innerHeight < 625 && this.state.showInfo) {
      this.setState({ showInfo: false });
    }
  }

  toggleButton() {
    const text = this.state.showInfo ? this.props.translate('infoBox.collapseName') : this.props.translate('infoBox.expandName');
    return <button className="control-panel__toggle" onClick={this.toggleInfo}>{text}</button>;
  }

  toggleIcon() {
    return (
      <button className="control-panel__toggle" onClick={this.togglePanel}>
        <i
          className={classnames({
            'fa fa-chevron-left': (!this.state.showPanel && !this.props.rtl) || (this.props.rtl && this.state.showPanel),
            'fa fa-chevron-right': (this.state.showPanel && !this.props.rtl) || (this.props.rtl && !this.state.showPanel)
          })}
        />
      </button>
    );
  }

  toggleInfo() {
    this.setState({ showInfo: !this.state.showInfo });
  }

  togglePanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  finishedPrompt() {
    this.props.dispatch(toggleDialog(
      <FinishedPrompt />, 'Finished'
    ));
  }

  showSubjectInfo() {
    return (
      <div className="control-panel__info">
        <div>
          <span className="primary-label">{this.props.translate('infoBox.name')}</span>
          <span className="body-font">ENA NS 78 0117</span>
        </div>
        <div>
          <span className="primary-label">{this.props.translate('infoBox.attribution')}</span>
          <span
            className={classnames('body-font ellipsis', {
              'ellipsis__left': this.props.rtl,
              'ellipsis__right': !this.props.rtl
            })}
          >
            Library of the Jewish Theological Seminary
          </span>
        </div>
        <a href="/" className="text-link">{this.props.translate('infoBox.libraryCatalog')}</a>
      </div>
    );
  }

  render() {
    const fieldGuideText = this.props.dialogComponent === 'FieldGuide' ? this.props.translate('infoBox.hideGuide') : this.props.translate('infoBox.showGuide');
    const cribSheetText = this.props.dialogComponent === 'CribSheet' ? this.props.translate('infoBox.hideCrib') : this.props.translate('infoBox.showCrib');
    const tutorialText = this.props.dialogComponent === 'Tutorial' ? 'Hide Tutorial' : 'Show Tutorial';

    const panel = (
      <FlippedControlPanel
        className={classnames('control-panel', {
          'control-panel__hide': !this.state.showInfo,
          'control-panel__rtl': this.props.rtl
        })}
        rtl={this.props.rtl}
      >
        <div className="control-panel__header">
          <h4 className="primary-label">{this.props.translate('infoBox.subjectInfo')}</h4>
          {this.toggleIcon()}
        </div>
        <hr className="plum-line" />
        <div className="control-panel__buttons">

          {this.state.showInfo && (
            this.showSubjectInfo()
          )}
          {this.toggleButton()}

          <button className="button" onClick={this.toggleCribSheet}>{cribSheetText}</button>
          <button className="button" onClick={this.toggleFieldGuide}>{fieldGuideText}</button>

          {this.props.tutorial && this.props.tutorialStatus === TUTORIAL_STATUS.READY && (
            <button className="button" onClick={this.toggleTutorial}>{this.props.translate('infoBox.showTutorial')}</button>
          )}

          <hr className="white-line" />

          <div>
            {(!(this.props.currentSubject && this.props.currentSubject.locations && this.props.currentSubject.locations.length >= 2)) ? null : (
              (this.props.frame === 0)
                ? <button className="button" onClick={()=>{this.props.dispatch(changeFrame(1))}}>{this.props.translate('infoBox.transcribeReverse')}</button>
                : <button className="button" onClick={()=>{this.props.dispatch(changeFrame(0))}}>{this.props.translate('infoBox.transcribeFront')}</button>
            )}
            {this.props.user && (  //Show the Save Progress button to logged-in users only.
              <button className="button" onClick={()=>{this.props.dispatch(WorkInProgress.save())}}>
                {this.props.translate('infoBox.saveProgress')}
              </button>
            )}
            <button className="button button__dark" onClick={this.finishedPrompt}>{this.props.translate('infoBox.finished')}</button>
            {this.props.wipTimestamp && (<div className="workinprogress-timestamp body-font">{this.props.translate('infoBox.lastSave') + ': ' + this.props.wipTimestamp.toString()}</div>)}
          </div>

        </div>
      </FlippedControlPanel>
    );

    if (this.state.showPanel) {
      return panel;
    }

    return (
      <FlippedControlPanel
        className={classnames('control-panel control-panel__side', {
          'control-panel__tall': this.state.showInfo,
          'control-panel__short': !this.state.showInfo,
          'control-panel__rtl': this.props.rtl
        })}
        rtl={this.props.rtl}
        ref={(c) => { this.sidePanel = c; }}
        role="button"
        onClick={this.togglePanel}
        tabIndex="0"
      >
        {this.toggleIcon()}
        <h2>EXPAND INFO</h2>
        {panel}
      </FlippedControlPanel>
    );
  }
}

ControlPanel.propTypes = {
  currentSubject: PropTypes.object,
  dialog: PropTypes.node,
  dialogComponent: PropTypes.string,
  dispatch: PropTypes.func,
  guide: PropTypes.shape({
    id: PropTypes.string
  }),
  icons: PropTypes.object,
  preferences: PropTypes.object,
  rtl: PropTypes.bool,
  translate: PropTypes.func,
  tutorial: PropTypes.shape({
    steps: PropTypes.array
  }),
  tutorialStatus: PropTypes.string,
  user: PropTypes.shape({
    admin: PropTypes.bool,
    id: PropTypes.string
  }),
  workflow: PropTypes.shape({
    id: PropTypes.string
  }),
  ...WORKINPROGRESS_PROPTYPES
};

ControlPanel.defaultProps = {
  currentSubject: null,
  dialog: null,
  dialogComponent: null,
  dispatch: () => {},
  frame: 0,
  guide: null,
  icons: null,
  preferences: null,
  rtl: false,
  translate: () => {},
  tutorial: null,
  tutorialStatus: TUTORIAL_STATUS.IDLE,
  user: null,
  workflow: null,
  ...WORKINPROGRESS_INITIAL_STATE,
};

const mapStateToProps = (state) => {
  return {
    currentLanguage: getActiveLanguage(state.locale).code,
    currentSubject: state.subject.currentSubject,
    dialog: state.dialog.data,
    dialogComponent: state.dialog.component,
    frame: state.subjectViewer.frame,
    guide: state.fieldGuide.guide,
    icons: state.fieldGuide.icons,
    preferences: state.project.userPreferences,
    rtl: state.languages.rtl,
    translate: getTranslate(state.locale),
    tutorial: state.tutorial.data,
    tutorialStatus: state.tutorial.status,
    user: state.login.user,
    workflow: state.workflow.data,
    ...getWorkInProgressStateValues(state),
  };
};

export default connect(mapStateToProps)(ControlPanel);
