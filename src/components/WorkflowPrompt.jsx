import React from 'react';
import WorkflowDropdown from './WorkflowDropdown';

const WorkflowPrompt = () => {
  return (
    <div className="workflow-prompt">
      <div className="workflow-prompt-test">
        <div className="workflow-prompt__header">
          <span>Choose a Workflow</span>
          <hr className="plum-line" />
        </div>
        <WorkflowDropdown className="workflow-prompt-popup" />
      </div>
    </div>
  );
};

export default WorkflowPrompt;
