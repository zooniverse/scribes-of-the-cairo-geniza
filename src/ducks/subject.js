import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

// Action Types
const FETCH_SUBJECT = 'FETCH_SUBJECT';
const FETCH_SUBJECT_SUCCESS = 'FETCH_SUBJECT_SUCCESS';
const FETCH_SUBJECT_ERROR = 'FETCH_SUBJECT_ERROR';

// Reducer
const SUBJECT_STATUS = {
  IDLE: 'subject_status_idle',
  FETCHING: 'subject_status_fetching',
  READY: 'subject_status_ready',
  ERROR: 'subject_status_error',
};

const initialState = {
  currentSubject: null,
  queue: [],
  status: SUBJECT_STATUS.IDLE,
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBJECT:
      return Object.assign({}, state, {
        status: SUBJECT_STATUS.FETCHING,
      });

    case FETCH_SUBJECT_SUCCESS:
      return {
        queue: action.queue,
        currentSubject: action.currentSubject,
        status: SUBJECT_STATUS.READY,
      };

    case FETCH_SUBJECT_ERROR:
      return Object.assign({}, state, {
        status: SUBJECT_STATUS.ERROR,
      });

    default:
      return state;
  };
};

const fetchQueue = (id = config.workflowId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUBJECT
    });

    apiClient.type('subjects/queued').get({ workflow_id: id})
      .then((queue) => {
        const currentSubject = queue.shift();
        dispatch({
          currentSubject,
          type: FETCH_SUBJECT_SUCCESS,
          queue
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_SUBJECT_ERROR });
      })
  };
};

export default subjectReducer;

export {
  fetchQueue
};
