import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { config } from '../config';
import { toggleDialog } from '../ducks/dialog';
import {
  setSubjectCompletionAnswers, submitClassification
} from '../ducks/classification';

class FinishedPrompt extends React.Component {
  constructor() {
    super();

    this.onCancel = this.onCancel.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onDoneAndTalk = this.onDoneAndTalk.bind(this);
  }

  onCancel() {
    this.props.dispatch(toggleDialog(null));
  }

  onDone() {
    this.props.dispatch(submitClassification());
    this.props.dispatch(toggleDialog(null));
  }

  onDoneAndTalk() {
    let talkUrl = `${config.host}projects/${config.projectSlug}/talk`;

    if (this.props.currentSubject) {
      talkUrl += `/subjects/${this.props.currentSubject.id}`;
    }
    window.open(talkUrl, '_blank');

    this.props.dispatch(submitClassification());
    this.props.dispatch(toggleDialog(null));
  }

  answersMatchQuestions() {
    let numberOfAnswersMatchQuestions = true;

    if (this.props.subjectCompletionAnswers && this.props.workflow) {
      const numberOfQuestions = Object.keys(this.props.workflow.tasks)
        .map(taskId => Object.assign({}, this.props.workflow.tasks[taskId], { taskId }))
        .filter(task => isAQuestionTask(task, this.props.workflow)).length;
      const numberOfAnswers = Object.keys(this.props.subjectCompletionAnswers).length;
      numberOfAnswersMatchQuestions = numberOfQuestions === numberOfAnswers;
    }
    return numberOfAnswersMatchQuestions;
  }

  render() {
    const disableSubmit = this.props.selectedAnnotation;
    const translate = this.props.translate;
    const answersMatchQuestions = this.answersMatchQuestions();
    const tasks = (this.props.workflow.tasks)
      ? Object.keys(this.props.workflow.tasks).map(taskId =>
        Object.assign({}, this.props.workflow.tasks[taskId], { taskId })
      )
        .filter(task => isAQuestionTask(task, this.props.workflow))
      : [];
    return (
      <div className="finished-prompt handle">
        <h2 className="h1-font">{translate('finished.allTranscribed')}</h2>
        <div className="finished-prompt__content">
          <span className="body-font">
            {translate('finished.instructions')}
          </span>
          <span className="body-font">
            {translate('finished.whenReady')}
          </span>
        </div>
        {tasks.map((task, taskIndex) => {
          return (
            <div
              className="finished-prompt__toggle"
              key={`submit-classification-form-task-${taskIndex}`}
            >
              {task.answers.map((answer, answerIndex) => {
                const checked = this.props.subjectCompletionAnswers &&
                this.props.subjectCompletionAnswers[task.taskId] === answerIndex;
                return (
                  <div
                    className="round-toggle"
                    key={`submit-classification-form-task-${taskIndex}-answer-${answerIndex}`}
                  >
                    <input
                      type="radio"
                      checked={checked}
                      id={`prompt_${answerIndex}`}
                      onChange={() => {
                        this.props.dispatch(setSubjectCompletionAnswers(task.taskId, answerIndex));
                      }}
                    />
                    <label
                      htmlFor={`prompt_${answerIndex}`}
                    >
                      <span>{answer.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}

        {disableSubmit && (
          <div className="finished-prompt__disable-submit">
            <span>You cannot submit a classification with an annotation in progress.</span>
          </div>
        )}

        <div className="finished-prompt__buttons">
          <button className="button" onClick={this.onCancel}>{translate('finished.cancel')}</button>
          <button
            className="button"
            disabled={!answersMatchQuestions || disableSubmit}
            onClick={this.onDone}
          >
            {translate('finished.done')}
          </button>
          <button
            className="button button__dark"
            disabled={!answersMatchQuestions || disableSubmit}
            onClick={this.onDoneAndTalk}
          >
            {translate('finished.doneAndTalk')}
          </button>
        </div>
      </div>
    );
  }
}

function isAQuestionTask(task, workflow) {
  return (
    task.taskId !== workflow.first_task &&
    task.type === 'single' &&
    task.question && task.answers && task.answers.length > 0
  );
}

FinishedPrompt.propTypes = {
  currentSubject: PropTypes.shape({
    id: PropTypes.string
  }),
  dispatch: PropTypes.func,
  selectedAnnotation: PropTypes.object,
  subjectCompletionAnswers: PropTypes.object,
  translate: PropTypes.func,
  workflow: PropTypes.shape({
    tasks: PropTypes.object
  })
};

FinishedPrompt.defaultProps = {
  currentSubject: null,
  dispatch: () => {},
  selectedAnnotation: null,
  subjectCompletionAnswers: null,
  translate: () => {},
  workflow: null
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  currentSubject: state.subject.currentSubject,
  selectedAnnotation: state.annotations.selectedAnnotation,
  subjectCompletionAnswers: state.classification.subjectCompletionAnswers,
  translate: getTranslate(state.locale),
  workflow: state.workflow.data
});

export default connect(mapStateToProps)(FinishedPrompt);
