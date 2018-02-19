import { config } from '../config';

//Action types
const FETCH_AGGREGATIONS = 'FETCH_AGGREGATIONS';
const FETCH_AGGREGATIONS_SUCCESS = 'FETCH_AGGREGATIONS_SUCCESS';
const FETCH_AGGREGATIONS_ERROR = 'FETCH_AGGREGATIONS_ERROR';

//Possible states of the Aggregations fetch attempt.
const AGGREGATIONS_STATUS = {
  IDLE: 'aggregations_status_idle',
  FETCHING: 'aggregations_status_fetching',
  SUCCESS: 'aggregations_status_success',
  ERROR: 'aggregations_status_error'
};

//Initial state for the Aggregations data.
//PRO TIP! Import this straight into the React components that use Aggregations.
const AGGREGATIONS_INITIAL_STATE = {
  aggData: null,
  aggStatus: AGGREGATIONS_STATUS.IDLE
};

const subjectReducer = (state = AGGREGATIONS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AGGREGATIONS:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.FETCHING
      });

    case FETCH_AGGREGATIONS_SUCCESS:
      return Object.assign({}, state, {
        aggData: action.data,
        status: AGGREGATIONS_STATUS.SUCCESS
      });

    case FETCH_AGGREGATIONS_ERROR:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.ERROR
      });

    default:
      return state;
  }
};

const fetchAggregations = (subjectId , workflowId = '3156'  /*SOMEBODY CHANGE ME*/) => {
  return (dispatch) => {
    
  }
}

export default aggregationsReducer;

export {
  fetchAggregations,
  AGGREGATIONS_INITIAL_STATE,
  AGGREGATIONS_STATUS
};