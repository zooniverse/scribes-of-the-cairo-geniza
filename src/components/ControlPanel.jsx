import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Tutorial } from 'zooniverse-react-components';
import { fetchGuide } from '../ducks/field-guide';
import { toggleDialog } from '../ducks/dialog';
import FieldGuide from '../components/FieldGuide';
import CribSheet from '../components/CribSheet';
import { fetchTutorial, TUTORIAL_STATUS } from '../ducks/tutorial';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
    this.toggleFieldGuide = this.toggleFieldGuide.bind(this);
    this.fetchTutorial = this.fetchTutorial.bind(this);
    this.showTutorial = this.showTutorial.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleCribSheet = this.toggleCribSheet.bind(this);

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
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTutorial(nextProps);

    if (nextProps.tutorial !== this.props.tutorial) {
      Tutorial.startIfNecessary(Tutorial, nextProps.tutorial, nextProps.user, nextProps.preferences);
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
      <FieldGuide guide={this.props.guide} icons={this.props.icons} />, 'Field Guide', undefined, 'FieldGuide'));
  }

  toggleCribSheet() {
    if (this.props.dialogComponent === 'CribSheet') {
      return this.props.dispatch(toggleDialog(null));
    }
    const dimensions = { height: 525, width: 650 };
    return this.props.dispatch(toggleDialog(<CribSheet />, '', dimensions, 'CribSheet'));
  }

  fetchTutorial(props) {
    if (props.workflow && props.preferences && props.tutorialStatus === TUTORIAL_STATUS.IDLE) {
      this.props.dispatch(fetchTutorial(props.workflow));
    }
  }

  showTutorial() {
    if (this.props.tutorial) {
      Tutorial.start(Tutorial, this.props.tutorial, this.props.user, this.props.preferences);
    }
  }

  handleResize() {
    if (window.innerHeight < 625 && this.state.showInfo) {
      this.setState({ showInfo: false });
    }
  }

  toggleButton() {
    const text = this.state.showInfo ? 'Collapse Name & Attribution' : 'Expand Name & Attribution';
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

  showSubjectInfo() {
    return (
      <div className="control-panel__info">
        <div>
          <span className="primary-label">Name</span>
          <span className="body-font">ENA NS 78 0117</span>
        </div>
        <div>
          <span className="primary-label">Attribution</span>
          <span
            className={classnames('body-font ellipsis', {
              'ellipsis__left': this.props.rtl,
              'ellipsis__right': !this.props.rtl
            })}
            className="body-font"
          >
            Library of the Jewish Theological Seminary
          </span>
        </div>
        <a href="/" className="text-link">Library Catalog Page</a>
      </div>
    );
  }

  render() {
    const fieldGuideText = this.props.dialogComponent === 'FieldGuide' ? 'Hide Field Guide' : 'Show Field Guide';
    const cribSheetText = this.props.dialogComponent === 'CribSheet' ? 'Hide Crib Sheet' : 'Show Crib Sheet';
    const Section = styled.section`
      left: ${props => props.rtl ? '0' : 'auto'};
      right: ${props => props.rtl ? 'auto' : '0'};
    `;

    const panel = (
      <Section
        className={classnames('control-panel', {
          'control-panel__hide': !this.state.showInfo,
          'control-panel__rtl': this.props.rtl
        })}
        rtl={this.props.rtl}
      >
        <div className="control-panel__header">
          <h4 className="primary-label">Subject info</h4>
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
            <button className="button" onClick={this.showTutorial}>Show Tutorial</button>
          )}

          <hr className="white-line" />

          <div>
            <button className="button">Transcribe Page Reverse</button>
            <button className="button">Save Progress</button>
            <button className="button button__dark">Done</button>
          </div>
        </div>
      </Section>
    );

    if (this.state.showPanel) {
      return panel;
    }

    return (
      <Section
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
      </Section>
    );
  }
}

ControlPanel.propTypes = {
  dialog: PropTypes.node,
  dialogComponent: PropTypes.string,
  dispatch: PropTypes.func,
  guide: PropTypes.shape({
    id: PropTypes.string
  }),
  icons: PropTypes.object,
  preferences: PropTypes.object,
  rtl: PropTypes.bool,
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
  })
};

ControlPanel.defaultProps = {
  dialog: null,
  dialogComponent: null,
  dispatch: () => {},
  guide: null,
  icons: null,
  preferences: null,
  rtl: false,
  tutorial: null,
  tutorialStatus: TUTORIAL_STATUS.IDLE,
  user: null,
  workflow: null
};

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog.data,
    dialogComponent: state.dialog.component,
    guide: state.fieldGuide.guide,
    icons: state.fieldGuide.icons,
    preferences: state.project.userPreferences,
    rtl: state.languages.rtl,
    tutorial: state.tutorial.data,
    tutorialStatus: state.tutorial.status,
    user: state.login.user,
    workflow: state.workflow.data
  };
};

export default connect(mapStateToProps)(ControlPanel);
