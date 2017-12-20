import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

// Action Types
const FETCH_PROJECT = 'FETCH_PROJECT';
const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';

const PROJECT_STATUS = {
  IDLE: 'project_status_idle',
  FETCHING: 'project_status_fetching',
  READY: 'project_status_ready',
  ERROR: 'project_status_error',
};

// Reducer
const initialState = {
  data: null,
  status: PROJECT_STATUS.IDLE,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return Object.assign({}, state, {
        status: PROJECT_STATUS.FETCHING,
      });

    case FETCH_PROJECT_SUCCESS:
      return {
        status: PROJECT_STATUS.READY,
        data: action.data,
      };

    case FETCH_PROJECT_ERROR:
      return Object.assign({}, state, {
        status: PROJECT_STATUS.ERROR,
      });

    default:
      return state;
  };
};

const fetchProject = (id = config.projectId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROJECT });

    apiClient.type('projects').get(id)
      .then((project) => {
        dispatch({
          type: FETCH_PROJECT_SUCCESS,
          data: project
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_PROJECT_ERROR });
      })
  };
};

export default projectReducer;

export {
  fetchProject
};
