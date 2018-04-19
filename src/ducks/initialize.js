import { fetchProject } from './project';
import { fetchWorkflow } from './workflow';
import { fetchGuide } from './field-guide';
import { initializeLanguages } from './languages';

const FETCH_RESOURCES = 'FETCH_RESOURCES';
const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS';
const FETCH_RESOURCES_ERROR = 'FETCH_RESOURCES_ERROR';

const INITIALIZER_STATUS = {
  IDLE: 'initializer_status_idle',
  FETCHING: 'initializer_status_fetching',
  READY: 'initializer_status_ready',
  ERROR: 'initializer_status_error'
};

// Reducer
const initialState = {
  ready: false,
  status: INITIALIZER_STATUS.IDLE
};

const initializeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES:
      return Object.assign({}, state, {
        status: INITIALIZER_STATUS.FETCHING
      });

    case FETCH_RESOURCES_SUCCESS:
      return {
        status: INITIALIZER_STATUS.READY,
        ready: true
      };

    default:
      return state;
  }
};

const fetchResources = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_RESOURCES });
    dispatch(initializeLanguages());

    Promise.all([
      dispatch(fetchProject()),
      dispatch(fetchWorkflow()),
      dispatch(fetchGuide())
    ]).then(() => {
      dispatch({ type: FETCH_RESOURCES_SUCCESS });
    }).catch(() => {
      dispatch({ type: FETCH_RESOURCES_ERROR });
    });
  };
};

export default initializeReducer;

export {
  fetchResources
};
