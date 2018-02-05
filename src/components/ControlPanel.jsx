import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tutorial } from 'zooniverse-react-components';
import { fetchGuide } from '../ducks/field-guide';
import { toggleDialog } from '../ducks/dialog';
import FieldGuide from '../components/FieldGuide';
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
    if (this.props.dialog) {
      return this.props.dispatch(toggleDialog(null));
    }

    return this.props.dispatch(toggleDialog(
      <FieldGuide guide={this.props.guide} icons={this.props.icons} />, 'Field Guide'));
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
    const iconClass = this.state.showPanel ? 'fa fa-chevron-right' : 'fa fa-chevron-left';
    return <button className="control-panel__toggle" onClick={this.togglePanel}><i className={iconClass} /></button>;
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
          <span className="body-font">Library of the Jewish Theological Seminary</span>
        </div>
        <a href="/" className="text-link">Library Catalog Page</a>
      </div>
    );
  }

  render() {
    const fieldGuideText = this.props.dialog ? 'Hide Field Guide' : 'Show Field Guide';
    const hiddenStyle = !this.state.showInfo ? 'control-panel__hide' : '';
    const peekHeight = this.state.showInfo ? 'control-panel__tall' : 'control-panel__short';
    const panel = (
      <section className={`control-panel ${hiddenStyle}`}>
        <div className="control-panel__header">
          <h4 className="primary-label">Subject info</h4>
          {this.toggleIcon()}
        </div>
        <hr />
        <div className="control-panel__buttons">

          {this.state.showInfo && (
            this.showSubjectInfo()
          )}
          {this.toggleButton()}

          <button className="button">Show Crib Sheet</button>
          <button className="button" onClick={this.toggleFieldGuide}>{fieldGuideText}</button>

          {this.props.tutorial && this.props.tutorialStatus === TUTORIAL_STATUS.READY && (
            <button className="button" onClick={this.showTutorial}>Show Tutorial</button>
          )}

          <hr className="control-panel__white-line" />

          <div>
            <button className="button">Transcribe Page Reverse</button>
            <button className="button">Save Progress</button>
            <button className="button button__dark">Done</button>
          </div>
        </div>
      </section>
    );

    if (this.state.showPanel) {
      return panel;
    }

    return (
      <section
        className={`control-panel control-panel__side ${peekHeight}`}
        ref={(c) => { this.sidePanel = c; }}
        role="button"
        onClick={this.togglePanel}
        tabIndex="0"
      >
        {this.toggleIcon()}
        <h2>EXPAND INFO</h2>
        {panel}
      </section>
    );
  }
}

ControlPanel.propTypes = {
  dialog: PropTypes.node,
  dispatch: PropTypes.func,
  guide: PropTypes.shape({
    id: PropTypes.string
  }),
  icons: PropTypes.object,
  preferences: PropTypes.object,
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
  dispatch: () => {},
  guide: null,
  icons: null,
  preferences: null,
  tutorial: null,
  tutorialStatus: TUTORIAL_STATUS.IDLE,
  user: null,
  workflow: null
};

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog.data,
    guide: state.fieldGuide.guide,
    icons: state.fieldGuide.icons,
    preferences: state.project.userPreferences,
    tutorial: state.tutorial.data,
    tutorialStatus: state.tutorial.status,
    user: state.login.user,
    workflow: state.workflow.data
  };
};

export default connect(mapStateToProps)(ControlPanel);