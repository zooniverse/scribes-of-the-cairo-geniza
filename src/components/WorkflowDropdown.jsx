import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkflow, toggleSelection } from '../ducks/workflow';
import { config } from '../config';

const WorkflowDropdown = ({ dispatch, history }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow));
    dispatch(toggleSelection(false));
    history.push('/classify');
    window.scrollTo(0, 0);
  };
  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <div className="selection-container">
      <div>
        <a
          className="tertiary-label"
          href={`${classifyPath}${c.phaseOne}`}
          target="_blank"
        >
          Phase One: Classify Fragments
        </a>
      </div>
      <div>
        <span className="h1-font">Hebrew</span>
        <span className="primary-label">Full Transcription</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyHebrew)}
        >
          Easy Hebrew
        </button>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.challengingHebrew)}
        >
          Challenging Hebrew
        </button>

        <div>
          <span className="primary-label">Keyword Search</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.hebrewKeyword}`}
            target="_blank"
          >
            Hebrew Keywords
          </a>
        </div>
      </div>
      <div>
        <span className="h1-font">Arabic</span>
        <span className="primary-label">Full Transcription</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyArabic)}
        >
          Easy Arabic
        </button>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.challengingArabic)}
        >
          Challenging Arabic
        </button>

        <div>
          <span className="primary-label">Keyword Search</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.arabicKeyword}`}
            target="_blank"
          >
            Arabic Keywords
          </a>
        </div>
      </div>
    </div>
  );
};

WorkflowDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect()(withRouter(WorkflowDropdown));
