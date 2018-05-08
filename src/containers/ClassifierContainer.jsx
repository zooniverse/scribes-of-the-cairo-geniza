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

        {(this.props.dialog === null) ? null :
          <Dialog>
            {this.props.dialog}
          </Dialog>
        }
      </main>
    );
  }
}

ClassifierContainer.propTypes = {
  dialog: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  workflowStatus: PropTypes.string.isRequired
};

ClassifierContainer.defaultProps = {
  dialog: null,
  user: null
};

const mapStateToProps = state => ({
  dialog: state.dialog.data,
  subjectStatus: state.subject.status,
  user: state.login.user,
  workflowStatus: state.workflow.status
});

export default connect(mapStateToProps)(ClassifierContainer);
