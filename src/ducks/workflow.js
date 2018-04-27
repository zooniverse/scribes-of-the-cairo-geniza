import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

import { fetchSubject, resetSubject } from './subject';
import { resetAnnotations } from './annotations';

// Action Types
const FETCH_WORKFLOW = 'FETCH_WORKFLOW';
const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS';
const FETCH_WORKFLOW_ERROR = 'FETCH_WORKFLOW_ERROR';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';

const WORKFLOW_STATUS = {
  IDLE: 'workflow_status_idle',
  FETCHING: 'workflow_status_fetching',
  READY: 'workflow_status_ready',
  ERROR: 'workflow_status_error'
};

// Reducer
const initialState = {
  data: null,
  id: null,
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
        data: action.data
      });

    case FETCH_WORKFLOW_ERROR:
      return Object.assign({}, state, {
        status: WORKFLOW_STATUS.ERROR
      });

    case TOGGLE_SELECTION:
      return Object.assign({}, state, {
        showSelection: action.show
      });

    default:
      return state;
  }
};

/*  Resets all the dependencies that rely on the Workflow.
 */
const prepareForNewWorkflow = () => {
  return (dispatch) => {
    dispatch(resetSubject());
    dispatch(resetAnnotations());
    dispatch(fetchSubject());
  };
};

const fetchWorkflow = (workflowId = config.easyHebrew) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORKFLOW,
      id: workflowId
    });

    return apiClient.type('workflows').get(workflowId)
      .then((workflow) => {
        dispatch({
          type: FETCH_WORKFLOW_SUCCESS,
          data: workflow
        });

        // onSuccess(), prepare for a new workflow.
        dispatch(prepareForNewWorkflow());
      })
      .catch(() => {
        dispatch({ type: FETCH_WORKFLOW_ERROR });
      });
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

export default workflowReducer;

export {
  fetchWorkflow,
  toggleSelection,
  WORKFLOW_STATUS
};
