import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionPrompt from './QuestionPrompt';
import WorkflowPrompt from './WorkflowPrompt';
import { clearWorkflow, toggleSelection } from '../ducks/workflow';
import { togglePopup } from '../ducks/dialog';
import { WorkInProgress } from '../ducks/work-in-progress';
import { resetSubject } from '../ducks/subject';

class StartNewWorkConfirmation extends React.Component {
  constructor() {
    super();

    this.startNewWork = this.startNewWork.bind(this);
    this.continueWork = this.continueWork.bind(this);
  }

  proceedToClassifier() {
    this.props.dispatch(toggleSelection(false));
    this.props.dispatch(togglePopup(null));
    this.props.history.push('/classify');
    window.scrollTo(0, 0);
  }

  startNewWork() {
    if (this.props.user && WorkInProgress.check(this.props.user)) {
      this.props.dispatch(WorkInProgress.clear());
    } else {
      this.props.dispatch(clearWorkflow());
      this.props.dispatch(resetSubject());
    }
    this.proceedToClassifier();
    this.props.dispatch(togglePopup(<WorkflowPrompt />));
  }

  continueWork() {
    if (this.props.user && WorkInProgress.check(this.props.user)) {
      this.props.dispatch(WorkInProgress.load());
    }
    this.proceedToClassifier();
  }

  render() {
    return (
      <QuestionPrompt
        confirm="Yes, start a new page"
        deny="No, continue saved progress"
        onConfirm={this.startNewWork}
        onDeny={this.continueWork}
        question="Are you sure you want to start a new workflow? This will delete any saved work you may have."
        title="Start new Work?"
      />
    );
  }
}

StartNewWorkConfirmation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

StartNewWorkConfirmation.defaultProps = {
  user: null
};

const mapStateToProps = state => {
  const user = state.login.user;
  const userHasWorkInProgress = user && WorkInProgress.check(user);

  return {
    activeAnnotationExists: (!!state.workflow.data && !!state.subject.currentSubject) || userHasWorkInProgress,
    user: state.login.user
  };
};

export default connect(mapStateToProps)(withRouter(StartNewWorkConfirmation));
