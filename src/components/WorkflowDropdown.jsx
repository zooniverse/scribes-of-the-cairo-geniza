import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { fetchWorkflow, toggleSelection } from '../ducks/workflow';
import { config } from '../config';

const WorkflowDropdown = ({ className, dispatch, history, translate }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow));
    dispatch(toggleSelection(false));
    history.push('/classify');
    window.scrollTo(0, 0);
  };
  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <div className={`selection-container ${className}`}>
      <div>
        <a
          className="tertiary-label"
          href={`${classifyPath}${c.phaseOne}`}
          target="_blank"
        >
          Phase One: Classify Fragments <i className="fa fa-external-link" />
        </a>
      </div>
      <div>
        <span className="h1-font">Hebrew</span>
        <span className="primary-label">Phase Two: Full Text Transcription</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyHebrew)}
        >
          {translate('transcribeHebrew.easy')}
        </button>
        {/* <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.challengingHebrew)}
        >
          {translate('transcribeHebrew.challenging')}
        </button> */}

        <div>
          <span className="primary-label">Keyword Search</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.hebrewKeyword}`}
            target="_blank"
          >
            {translate('keywordsHebrew.button')} <i className="fa fa-external-link" />
          </a>
        </div>
      </div>
      <div>
        <span className="h1-font">Arabic</span>
        <span className="primary-label">Phase Two: Full Text Transcription</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyArabic)}
        >
          {translate('transcribeArabic.easy')}
        </button>
        {/* <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.challengingArabic)}
        >
          {translate('transcribeArabic.challenging')}
        </button> */}

        <div>
          <span className="primary-label">Keyword Search</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.arabicKeyword}`}
            target="_blank"
          >
            {translate('keywordsArabic.button')} <i className="fa fa-external-link" />
          </a>
        </div>
      </div>
    </div>
  );
};

WorkflowDropdown.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  translate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(withRouter(WorkflowDropdown));
