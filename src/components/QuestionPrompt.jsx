import React from 'react';
import PropTypes from 'prop-types';

const QuestionPrompt = (props) => {
  return (
    <div className="question-prompt" role="presentation">
      <div className="question-prompt__content">
        <div>
          <h2>{props.title}</h2>
        </div>
        <hr className="plum-line" />

        <div className="question-prompt__instructions">
          <span>{props.question}</span>
          <span>{props.notes}</span>
        </div>

        <div className="prompt-buttons">
          <button className="button" onClick={props.onDeny}>{props.deny}</button>
          <button className="button button__dark" onClick={props.onConfirm}>{props.confirm}</button>
        </div>
      </div>
    </div>
  );
};

QuestionPrompt.propTypes = {
  confirm: PropTypes.string,
  deny: PropTypes.string,
  notes: PropTypes.string,
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func,
  question: PropTypes.string,
  title: PropTypes.string
};

QuestionPrompt.defaultProps = {
  confirm: '',
  deny: '',
  notes: '',
  onConfirm: () => {},
  onDeny: () => {},
  question: '',
  title: ''
};

export default QuestionPrompt;
