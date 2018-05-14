import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { togglePopup } from '../ducks/dialog';
import { WORKFLOW_STATUS } from '../ducks/workflow';
import { WorkInProgress } from '../ducks/work-in-progress';

import ControlPanel from '../components/ControlPanel';
import WorkflowPrompt from '../components/WorkflowPrompt';
import Toolbar from '../components/Toolbar';
import SubjectViewer from './SubjectViewer';
import Dialog from '../components/Dialog';

class ClassifierContainer extends React.Component {
  componentWillMount() {
    if (this.props.workflowStatus === WORKFLOW_STATUS.IDLE && !WorkInProgress.check(this.props.user)) {
      this.props.dispatch(togglePopup(<WorkflowPrompt />));
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.workflowStatus !== next.workflowStatus) {
      this.props.dispatch(togglePopup(null));
    }
  }

  render() {
    return (
      <main className="classifier">
        <ControlPanel />
        <SubjectViewer />
        <Toolbar />

        {(this.props.annotationPane === null) ? null :
          <Dialog component={this.props.component} size={this.props.annotationPaneSize}>
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
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
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
  size: { height: 200, width: 200 },
  user: null
};

const mapStateToProps = state => ({
  annotationPane: state.dialog.annotationPane,
  annotationPaneSize: state.dialog.annotationPaneSize,
  component: state.dialog.component,
  dialog: state.dialog.data,
  size: state.dialog.size,
  subjectStatus: state.subject.status,
  user: state.login.user,
  workflowStatus: state.workflow.status
});

export default connect(mapStateToProps)(ClassifierContainer);
