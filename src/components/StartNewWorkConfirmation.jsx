import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import QuestionPrompt from './QuestionPrompt';
import WorkflowPrompt from './WorkflowPrompt';
import { toggleSelection } from '../ducks/workflow';
import { togglePopup } from '../ducks/dialog';
import { WorkInProgress } from '../ducks/work-in-progress';

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
        confirm={this.props.translate('questionPrompt.confirm')}
        deny={this.props.translate('questionPrompt.deny')}
        onConfirm={this.startNewWork}
        onDeny={this.continueWork}
        question={this.props.translate('questionPrompt.question')}
        title={this.props.translate('questionPrompt.title')}
      />
    );
  }
}

StartNewWorkConfirmation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  translate: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

StartNewWorkConfirmation.defaultProps = {
  translate: () => {},
  user: null
};

const mapStateToProps = state => {
  const user = state.login.user;
  const userHasWorkInProgress = user && WorkInProgress.check(user);

  return {
    activeAnnotationExists: (!!state.workflow.data && !!state.subject.currentSubject) || userHasWorkInProgress,
    currentLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale),
    user: state.login.user
  };
};

export default connect(mapStateToProps)(withRouter(StartNewWorkConfirmation));
