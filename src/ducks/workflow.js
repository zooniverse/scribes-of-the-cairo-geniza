import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

import { resetSubject } from './subject';
import { resetAnnotations } from './annotations';
import { createClassification } from './classification';

// Action Types
const FETCH_WORKFLOW = 'FETCH_WORKFLOW';
const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS';
const FETCH_WORKFLOW_ERROR = 'FETCH_WORKFLOW_ERROR';

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

    default:
      return state;
  }
};

const fetchWorkflow = (workflowId = config.workflowId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORKFLOW,
      id: workflowId,
    });

    return apiClient.type('workflows').get(workflowId)
      .then((workflow) => {
        dispatch({
          type: FETCH_WORKFLOW_SUCCESS,
          data: workflow
        });

        //onSuccess(), prepare for a new workflow.
        dispatch(prepareForNewWorkflow());
      })
      .catch(() => {
        dispatch({ type: FETCH_WORKFLOW_ERROR });
      });
  };
};

/*  Resets all the dependencies that rely on the Workflow.
 */
const prepareForNewWorkflow = () => {
  return (dispatch) => {
    dispatch(resetSubject());
    dispatch(resetAnnotations());
    dispatch(createClassification(subject));
  }
};

export default workflowReducer;

export {
  fetchWorkflow,
  WORKFLOW_STATUS
};
