import { request } from 'graphql-request';
import PropTypes from 'prop-types';
import { env, config } from '../config';

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

const AGGREGATIONS_PROP_TYPES = {
  aggData: PropTypes.object,  //TODO: Check this?
  aggStatus: PropTypes.string,
};

const aggregationsReducer = (state = AGGREGATIONS_INITIAL_STATE, action) => {
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

const fetchAggregations = (subjectId) => {
  return (dispatch) => {
    /*SOMEBODY CHANGE ME*/
    let workflowId = '';
    let reducerKey = '';
    let query = '';
    let caesarHost = '';
    
    if (env === 'staging') {
      workflowId = '3156';
      reducerKey = 'hebrew_word';
      caesarHost = 'https://caesar-staging.zooniverse.org/graphql';
      query = `{
        workflow(id: ${workflowId}) {
          subject_reductions(subjectId: ${subjectId}, reducerKey: "${reducerKey}") {
            data
          }
        }
      }`
    }
    
    dispatch({ type: FETCH_AGGREGATIONS });
    
    request(caesarHost, query)
    .then((data) => {
      const aggregationData = (data && data.workflow && data.workflow.subject_reductions && data.workflow.subject_reductions[0] &&
                               data.workflow.subject_reductions[0].data && data.workflow.subject_reductions[0].data.frame0)
        ? data.workflow.subject_reductions[0].data.frame0 : {};
      dispatch({ type: FETCH_AGGREGATIONS_SUCCESS, data: aggregationData });
    })
    .catch((err) => {
      console.error('ducks/aggregations.js fetchAggregations() error: ', err);
      dispatch({ type: FETCH_AGGREGATIONS_ERROR });
    });
  }
}

export default aggregationsReducer;

export {
  fetchAggregations,
  AGGREGATIONS_INITIAL_STATE,
  AGGREGATIONS_STATUS,
  AGGREGATIONS_PROP_TYPES
};