import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

// Action Types
const FETCH_WORKFLOW = 'FETCH_WORKFLOW';

// Reducer
const initialState = {
  data: null,
};

const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKFLOW:
      return {
        data: action.data,
      };
    default:
      return state;
  };
};

const fetchWorkflow = (id = config.workflowId) => {
  return (dispatch) => {
    apiClient.type('workflows').get(id)
      .then((workflow) => {
        dispatch({
          type: FETCH_PROJECT,
          data: workflow
        });
      })
  };
};

export default workflowReducer;

export {
  fetchWorkflow
};
