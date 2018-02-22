import PropTypes from 'prop-types';
import apiClient from 'panoptes-client/lib/api-client';
import { request } from 'graphql-request';
import { config } from '../config';

const FETCH_AGGREGATION_RESOURCES = 'FETCH_AGGREGATION_RESOURCES';
const FETCH_AGGREGATION_RESOURCES_SUCCESS = 'FETCH_AGGREGATION_RESOURCES_SUCCESS';
const FETCH_AGGREGATION_RESOURCES_ERROR = 'FETCH_AGGREGATION_RESOURCES_ERROR';

const FETCH_AGGREGATIONS_SUCCESS = 'FETCH_AGGREGATIONS_SUCCESS';
const FETCH_KEYWORD_WORKFLOW_SUCCESS = 'FETCH_KEYWORD_WORKFLOW_SUCCESS';

const AGGREGATIONS_STATUS = {
  IDLE: 'aggregations_status_idle',
  FETCHING: 'aggregations_status_fetching',
  READY: 'aggregations_status_ready',
  ERROR: 'aggregations_status_error'
};

const AGGREGATIONS_INITIAL_STATE = {
  data: null,
  status: AGGREGATIONS_STATUS.IDLE,
  keywordWorkflow: null
};

const AGGREGATIONS_PROP_TYPES = {
  data: PropTypes.object,
  status: PropTypes.string,
  keywordWorkflow: PropTypes.object
};

const aggregationsReducer = (state = AGGREGATIONS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AGGREGATION_RESOURCES:
      return Object.assign({}, state, {
        data: null,
        status: AGGREGATIONS_STATUS.FETCHING
      });

    case FETCH_AGGREGATIONS_SUCCESS:
      return Object.assign({}, state, {
        data: action.aggregationData
      });

    case FETCH_KEYWORD_WORKFLOW_SUCCESS:
      return Object.assign({}, state, {
        keywordWorkflow: action.keywordWorkflow
      });

    case FETCH_AGGREGATION_RESOURCES_SUCCESS:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.READY
      });

    case FETCH_AGGREGATION_RESOURCES_ERROR:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.ERROR
      });

    default:
      return state;
  }
};

const fetchAggregations = (subjectId) => {
  if (!subjectId) return () => {};
  return (dispatch) => {
    const workflowId = config.keywordWorkflow;
    const reducerKey = 'hebrew_word';

    const query = `{
      workflow(id: ${workflowId}) {
        subject_reductions(subjectId: ${subjectId}, reducerKey:"${reducerKey}") {
          data
        }
      }
    }`;
    dispatch({ type: FETCH_AGGREGATION_RESOURCES });

    const fetchData = request(config.caesarHost, query)
      .then((data) => {
        const aggregationData = (data && data.workflow &&
          data.workflow.subject_reductions && data.workflow.subject_reductions[0] &&
          data.workflow.subject_reductions[0].data && data.workflow.subject_reductions[0].data.frame0)
          ? data.workflow.subject_reductions[0].data.frame0 : {};
        dispatch({ type: FETCH_AGGREGATIONS_SUCCESS, aggregationData });
      });

    const fetchWorkflow = apiClient.type('workflows').get({ id: config.keywordWorkflow })
      .then(([keywordWorkflow]) => {
        dispatch({ type: FETCH_KEYWORD_WORKFLOW_SUCCESS, keywordWorkflow });
      });

    Promise.all([fetchData, fetchWorkflow]).then(() => {
      dispatch({ type: FETCH_AGGREGATION_RESOURCES_SUCCESS });
    }).catch(() => {
      dispatch({ type: FETCH_AGGREGATION_RESOURCES_ERROR });
    });
  };
};

export default aggregationsReducer;

export {
  fetchAggregations,
  AGGREGATIONS_INITIAL_STATE,
  AGGREGATIONS_STATUS,
  AGGREGATIONS_PROP_TYPES
};
