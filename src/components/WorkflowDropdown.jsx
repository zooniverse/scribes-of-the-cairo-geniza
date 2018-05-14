import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { fetchWorkflow, toggleSelection } from '../ducks/workflow';
import { fetchSubject } from '../ducks/subject';
import { WorkInProgress } from '../ducks/work-in-progress';
import { config } from '../config';

const WorkflowDropdown = ({ className, dispatch, history, translate, activeAnnotationExists }) => {
  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow)).then(() => dispatch(fetchSubject()));
    dispatch(toggleSelection(false));
    history.push('/classify');
    window.scrollTo(0, 0);
  };

  const continueActiveAnnotation = () => {
    dispatch(toggleSelection(false));
    history.push('/classify');
    window.scrollTo(0, 0);
  };

  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;

  return (
    <div className={`selection-container ${className}`}>
      {(!activeAnnotationExists) ? null : (
        <div>
          <button
            className="tertiary-label"
            onClick={continueActiveAnnotation}
          >
            {translate('workflowSelection.continue')}
          </button>
        </div>
      )}
      <div>
        <a
          className="tertiary-label"
          href={`${classifyPath}${c.phaseOne}`}
          target="_blank"
        >
          {translate('workflowSelection.phaseOne')} <i className="fa fa-external-link-alt" />
        </a>
      </div>
      <div>
        <span className="h1-font">{translate('general.hebrew')}</span>
        <span className="primary-label">{translate('workflowSelection.phaseTwo')}</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyHebrew)}
        >
          {translate('transcribeHebrew.easy')}
        </button>
        <div className="disabled-workflow">
          <button
            className="tertiary-label disabled-workflow"
            disabled
            onClick={selectWorkflow.bind(null, c.challengingHebrew)}
          >
            {translate('transcribeHebrew.challenging')}
          </button>
          <span>{translate('general.comingSoon')}</span>
        </div>

        <div>
          <span className="primary-label">{translate('workflowSelection.keywordSearch')}</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.hebrewKeyword}`}
            target="_blank"
          >
            {translate('keywordsHebrew.button')} <i className="fa fa-external-link-alt" />
          </a>
        </div>
      </div>
      <div>
        <span className="h1-font">{translate('general.arabic')}</span>
        <span className="primary-label">{translate('workflowSelection.phaseTwo')}</span>
        <button
          className="tertiary-label"
          onClick={selectWorkflow.bind(null, c.easyArabic)}
        >
          {translate('transcribeArabic.easy')}
        </button>
        <div className="disabled-workflow">
          <button
            className="tertiary-label"
            disabled
            onClick={selectWorkflow.bind(null, c.challengingArabic)}
          >
            {translate('transcribeArabic.challenging')}
          </button>
          <span>{translate('general.comingSoon')}</span>
        </div>

        <div>
          <span className="primary-label">{translate('workflowSelection.keywordSearch')}</span>
          <a
            className="tertiary-label"
            href={`${classifyPath}${c.arabicKeyword}`}
            target="_blank"
          >
            {translate('keywordsArabic.button')} <i className="fa fa-external-link-alt" />
          </a>
        </div>
      </div>
    </div>
  );
};

WorkflowDropdown.propTypes = {
  activeAnnotationExists: PropTypes.bool,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  translate: PropTypes.func.isRequired
};

WorkflowDropdown.defaultProps = {
  activeAnnotationExists: false,
  className: '',
  dispatch: () => {},
  history: {
    push: () => {}
  },
  translate: () => {}
};

const mapStateToProps = state => {
  const user = state.login.user;
  const userHasWorkInProgress = user && WorkInProgress.check(user);

  return {
    // Does the user currently have a page being actively annotated, (e.g. user
    // navigated away from the Classifier page and wants to return), or have
    // saved work in progress? (e.g. user reloaded the website after a crash)
    // We need to know if the user has any work that can be retrieved (either
    // from the Redux store of local storage) so we can prompt them to continue.
    activeAnnotationExists: (!!state.workflow.data && !!state.subject.currentSubject) || userHasWorkInProgress,
    currentLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale),
    user: state.login.user // Needed, otherwise component won't update when it detects a user login.
  };
};

export default connect(mapStateToProps)(withRouter(WorkflowDropdown));
