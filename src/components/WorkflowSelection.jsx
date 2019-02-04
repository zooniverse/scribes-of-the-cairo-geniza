import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { fetchWorkflow, toggleSelection } from '../ducks/workflow';
import { fetchSubject } from '../ducks/subject';
import { WorkInProgress } from '../ducks/work-in-progress';
import { togglePopup } from '../ducks/dialog';
import { config } from '../config';
import StartNewWorkConfirmation from './StartNewWorkConfirmation';

const WorkflowSelection = ({ adminMode, className, dispatch, location, history, translate, showAllWorkflows, activeAnnotationExists }) => {
  const proceedToClassifier = () => {
    dispatch(toggleSelection(false));
    dispatch(togglePopup(null));
    history.push('/classify');
    window.scrollTo(0, 0);
  };

  const selectWorkflow = (workflow) => {
    dispatch(fetchWorkflow(workflow)).then(()=>{
      return dispatch(fetchSubject());
    });
    proceedToClassifier();
  };

  const newWorkPrompt = () => {
    dispatch(togglePopup(
      <StartNewWorkConfirmation />));
  };

  const makeSelection = (loadSaved) => {
    if (loadSaved) {
      dispatch(WorkInProgress.load());
    } else if (activeAnnotationExists) {
      return newWorkPrompt();
    }
    proceedToClassifier();
  };

  const c = config;
  const classifyPath = `${c.host}projects/${c.projectSlug}/classify?workflow=`;
  return (
    <div className={`selection-container ${className}`}>
      {(!activeAnnotationExists || location.pathname === '/classify') ? null : (
        <div>
          <button
            className="tertiary-label"
            onClick={makeSelection.bind(this, true)}
          >
            {translate('workflowSelection.continue')}
          </button>
        </div>
      )}

      {!showAllWorkflows && (
        <div>
          <button
            className="tertiary-label"
            onClick={makeSelection.bind(this, false)}
          >
            {translate('workflowSelection.choose')}
          </button>
        </div>
      )}

      {showAllWorkflows && (
        <div>
          <div>
            <a
              className="tertiary-label"
              href={`${classifyPath}${c.phaseOne}`}
              rel="noopener noreferrer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate('workflowSelection.phaseOne')} <i className="fa fa-external-link-alt" />
            </a>
          </div>
          <div>
            <span className="h1-font">{translate('general.hebrew')}</span>
            <span className="primary-label">{translate('workflowSelection.phaseTwo')}</span>
            <div className="disabled-workflow">
              <button
                className="tertiary-label"
                // disabled={!adminMode}
                onClick={selectWorkflow.bind(null, c.easyHebrew)}
              >
                {translate('transcribeHebrew.easy')}
              </button>
              <span>{translate('general.comingSoon')}</span>
            </div>
            <div className="disabled-workflow">
              <button
                className="tertiary-label disabled-workflow"
                disabled={!adminMode}
                onClick={selectWorkflow.bind(null, c.challengingHebrew)}
              >
                {translate('transcribeHebrew.challenging')}
              </button>
              <span>{translate('general.comingSoon')}</span>
            </div>

            <div>
              <span className="primary-label">{translate('workflowSelection.keywordSearch')}</span>
              <div className="disabled-workflow">
                <a
                  className={classnames('tertiary-label', {
                    'disabled-workflow--enable': adminMode
                  })}
                  href={`${classifyPath}${c.hebrewKeyword}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {translate('keywordsHebrew.button')} <i className="fa fa-external-link-alt" />
                </a>
                <span>{translate('general.comingSoon')}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="h1-font">{translate('general.arabic')}</span>
            <span className="primary-label">{translate('workflowSelection.phaseTwo')}</span>
            <div className="disabled-workflow">
              <button
                className="tertiary-label"
                disabled={!adminMode}
                onClick={selectWorkflow.bind(null, c.easyArabic)}
              >
                {translate('transcribeArabic.easy')}
              </button>
              <span>{translate('general.comingSoon')}</span>
            </div>
            <div className="disabled-workflow">
              <button
                className="tertiary-label"
                disabled={!adminMode}
                onClick={selectWorkflow.bind(null, c.challengingArabic)}
              >
                {translate('transcribeArabic.challenging')}
              </button>
              <span>{translate('general.comingSoon')}</span>
            </div>

            <div>
              <span className="primary-label">{translate('workflowSelection.keywordSearch')}</span>
              <div className="disabled-workflow">
                <a
                  className={classnames('tertiary-label', {
                    'disabled-workflow--enable': adminMode
                  })}
                  href={`${classifyPath}${c.arabicKeyword}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {translate('keywordsArabic.button')} <i className="fa fa-external-link-alt" />
                </a>
                <span>{translate('general.comingSoon')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

WorkflowSelection.propTypes = {
  activeAnnotationExists: PropTypes.bool,
  adminMode: PropTypes.bool,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  showAllWorkflows: PropTypes.bool,
  translate: PropTypes.func.isRequired
};

WorkflowSelection.defaultProps = {
  activeAnnotationExists: false,
  adminMode: false,
  className: '',
  dispatch: () => {},
  history: {
    push: () => {}
  },
  location: {},
  showAllWorkflows: true,
  translate: () => {},
  user: null
};

const mapStateToProps = state => {
  const user = state.login.user;
  const userHasWorkInProgress = user && WorkInProgress.check(user);

  return {
    //Does the user currently have a page being actively annotated, (e.g. user
    //navigated away from the Classifier page and wants to return), or have
    //saved work in progress? (e.g. user reloaded the website after a crash)
    //We need to know if the user has any work that can be retrieved (either
    //from the Redux store of local storage) so we can prompt them to continue.
    activeAnnotationExists: (!!state.workflow.data && !!state.subject.currentSubject) || userHasWorkInProgress,
    adminMode: state.login.adminMode,
    currentLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale),
    user: state.login.user,  //Needed, otherwise component won't update when it detects a user login.
  };
};

export default connect(mapStateToProps)(withRouter(WorkflowSelection));
