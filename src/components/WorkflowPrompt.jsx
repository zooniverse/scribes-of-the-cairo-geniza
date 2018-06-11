import React from 'react';
import WorkflowSelection from './WorkflowSelection';

const WorkflowPrompt = () => {
  return (
    <div className="workflow-prompt">
      <div className="workflow-prompt-content">
        <div className="workflow-prompt__header">
          <span>Choose a Workflow</span>
          <hr className="plum-line" />
        </div>
        <WorkflowSelection className="workflow-prompt-popup" />
      </div>
    </div>
  );
};

export default WorkflowPrompt;
