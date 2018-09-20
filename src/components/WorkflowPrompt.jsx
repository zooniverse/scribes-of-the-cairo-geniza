import React from 'react';
import WorkflowSelection from './WorkflowSelection';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

const WorkflowPrompt = ({ translate }) => {
  return (
    <div className="workflow-prompt">
      <div className="workflow-prompt-content">
        <div className="workflow-prompt__header">
          <span>
            {translate('workflowSelection.choose')}
          </span>
          <hr className="plum-line" />
        </div>
        <WorkflowSelection className="workflow-prompt-popup" />
      </div>
    </div>
  );
};

WorkflowSelection.propTypes = {
  translate: PropTypes.func.isRequired
};

WorkflowSelection.defaultProps = {
  translate: () => {}
};

const mapStateToProps = state => {
  return {
    currentLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale)
  };
};

export default connect(mapStateToProps)(WorkflowPrompt);
