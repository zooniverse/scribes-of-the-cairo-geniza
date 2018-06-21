import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { togglePopup } from '../ducks/dialog';
import { shownStartReminder, toggleReminder } from '../ducks/reminder';
import { WORKFLOW_STATUS } from '../ducks/workflow';
import { WorkInProgress } from '../ducks/work-in-progress';

import ControlPanel from '../components/ControlPanel';
import WorkflowPrompt from '../components/WorkflowPrompt';
import Toolbar from '../components/Toolbar';
import Dialog from '../components/Dialog';
import HelperMessage from '../components/HelperMessage';

import SubjectViewer from './SubjectViewer';

class ClassifierContainer extends React.Component {
  componentDidMount() {
    this._isMounted = true;
    
    if (this.props.workflowStatus === WORKFLOW_STATUS.IDLE && !WorkInProgress.check(this.props.user)) {
      this.props.dispatch(togglePopup(<WorkflowPrompt />));
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.workflowStatus !== next.workflowStatus) {
      this.props.dispatch(togglePopup(null));
      setTimeout(() => {
        if (this._isMounted) {
          this.toggleHelp();
        }
      }, 5000);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    
    if (this.props.popup) {
      this.props.dispatch(togglePopup(null));
    }
  }

  toggleHelp() {
    if (!this.props.shownBeginReminder) {
      const message = 'Get Started by clicking "Add Transcription"';
      this.props.dispatch(shownStartReminder());
      this.props.dispatch(toggleReminder(
        <HelperMessage message={message} width={275} />
      ));
    }
  }

  render() {
    const annotationPaneDefault = (this.props.annotationPaneOffset)
      ? this.props.annotationPaneOffset
      : undefined;
    
    return (
      <main className="classifier">
        <ControlPanel />
        <SubjectViewer />
        <Toolbar />

        {(this.props.annotationPane === null) ? null :
          <Dialog component={this.props.component} size={this.props.annotationPaneSize} default={annotationPaneDefault}>
            {this.props.annotationPane}
          </Dialog>
        }

        {(this.props.dialog === null) ? null :
          <Dialog component={'Annotation'} isAnnotation={false} size={this.props.size}>
            {this.props.dialog}
          </Dialog>
        }
      </main>
    );
  }
}

ClassifierContainer.propTypes = {
  annotationPane: PropTypes.node,
  annotationPaneSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  component: PropTypes.string,
  dialog: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  popup: PropTypes.node,
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  shownBeginReminder: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  workflowStatus: PropTypes.string.isRequired
};

ClassifierContainer.defaultProps = {
  annotationPane: null,
  annotationPaneSize: { height: 200, width: 200 },
  component: '',
  dialog: null,
  popup: null,
  size: { height: 200, width: 200 },
  shownBeginReminder: false,
  user: null
};

const mapStateToProps = state => ({
  annotationPane: state.dialog.annotationPane,
  annotationPaneSize: state.dialog.annotationPaneSize,
  annotationPaneOffset: state.dialog.annotationPaneOffset,
  component: state.dialog.component,
  dialog: state.dialog.data,
  popup: state.dialog.popup,
  size: state.dialog.size,
  shownBeginReminder: state.reminder.shownBeginReminder,
  subjectStatus: state.subject.status,
  user: state.login.user,
  workflowStatus: state.workflow.status
});

export default connect(mapStateToProps)(ClassifierContainer);
