import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

import { LANGUAGES } from './languages';
import { resetSubject } from './subject';
import { resetAnnotations } from './annotations';
import { fetchTutorial } from './tutorial';
import { toggleLanguage } from './keyboard';
import { loadTranslations } from './translations';

// Action Types
const FETCH_WORKFLOW = 'FETCH_WORKFLOW';
const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS';
const FETCH_WORKFLOW_ERROR = 'FETCH_WORKFLOW_ERROR';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_WORKFLOW = 'CLEAR_WORKFLOW';
const FETCH_ALL_WORKFLOWS = 'FETCH_ALL_WORKFLOWS';

const WORKFLOW_STATUS = {
  IDLE: 'workflow_status_idle',
  FETCHING: 'workflow_status_fetching',
  READY: 'workflow_status_ready',
  ERROR: 'workflow_status_error'
};

const ARABIC_WORKFLOWS = [config.easyArabic, config.challengingArabic];

// Reducer
const initialState = {
  allWorkflows: {},
  data: null,
  id: null,
  manuscriptLanguage: LANGUAGES.HEBREW,
  showSelection: false,
  status: WORKFLOW_STATUS.IDLE
};

const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKFLOW:
      return Object.assign({}, state, {
        status: WORKFLOW_STATUS.FETCHING,
        id: action.id
      });

    case FETCH_WORKFLOW_SUCCESS:
      return Object.assign({}, state, {
        status: WORKFLOW_STATUS.READY,
        data: action.data,
        manuscriptLanguage: action.manuscriptLanguage
      });

    case FETCH_WORKFLOW_ERROR:
      return Object.assign({}, state, {
        status: WORKFLOW_STATUS.ERROR
      });

    case TOGGLE_SELECTION:
      return Object.assign({}, state, {
        showSelection: action.show
      });

    case CLEAR_WORKFLOW:
      return initialState;

    case FETCH_ALL_WORKFLOWS:
      return Object.assign({}, state, {
        allWorkflows: action.allWorkflows
      });

    default:
      return state;
  }
};

/*  Resets all the dependencies that rely on the Workflow.
 */
const prepareForNewWorkflow = () => {
  return (dispatch, getState) => {
    dispatch(loadTranslations('workflow', getState().workflow.id));
    dispatch(resetSubject());
    dispatch(resetAnnotations());
    dispatch(fetchTutorial());
  };
};

const fetchWorkflow = (workflowId = config.easyHebrew) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_WORKFLOW,
      id: workflowId
    });

    const allWorkflows = getState().workflow.allWorkflows;

    if (allWorkflows[workflowId]) {
      const manuscriptLanguage = ARABIC_WORKFLOWS.indexOf(workflowId) >= 0 ? LANGUAGES.ARABIC : LANGUAGES.HEBREW;

      return Promise.resolve(
        dispatch({
          type: FETCH_WORKFLOW_SUCCESS,
          data: allWorkflows[workflowId],
          manuscriptLanguage
        }),
        dispatch(toggleLanguage(manuscriptLanguage)),
        dispatch(prepareForNewWorkflow())
      );
    } else {
      return apiClient.type('workflows').get(workflowId)
        .then((workflow) => {
          const manuscriptLanguage = ARABIC_WORKFLOWS.indexOf(workflow.id) >= 0 ? LANGUAGES.ARABIC : LANGUAGES.HEBREW;

          dispatch({
            type: FETCH_WORKFLOW_SUCCESS,
            data: workflow,
            manuscriptLanguage
          });
          dispatch(toggleLanguage(manuscriptLanguage));
          dispatch(prepareForNewWorkflow());
        })
        .catch(() => {
          dispatch({ type: FETCH_WORKFLOW_ERROR });
        });
    }
  };
};

const toggleSelection = (show) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECTION,
      show
    });
  };
};


const clearWorkflow = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_WORKFLOW });
  };
};

const fetchPhaseTwoWorkflows = () => {
  return (dispatch) => {
    const allWorkflows = {
      [config.easyHebrew]: null,
      [config.challengingHebrew]: null,
      [config.easyArabic]: null,
      [config.challengingArabic]: null
    };
    const calls = [];

    Object.keys(allWorkflows).forEach(id =>
      calls.push(
        apiClient.type('workflows').get(id)
          .then((workflow) => {
            if (workflow) {
              allWorkflows[id] = workflow;
            }
          }))
    );

    Promise.all(calls).then(() => {
      dispatch({
        type: FETCH_ALL_WORKFLOWS,
        allWorkflows
      });
    });
  };
};

export default workflowReducer;

export {
  clearWorkflow,
  fetchPhaseTwoWorkflows,
  fetchWorkflow,
  toggleSelection,
  WORKFLOW_STATUS
};
