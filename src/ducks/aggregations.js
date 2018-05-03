import PropTypes from 'prop-types';
import apiClient from 'panoptes-client/lib/api-client';
import merge from 'lodash/merge';
import { request } from 'graphql-request';
import { config } from '../config';

const FETCH_AGGREGATION_RESOURCES = 'FETCH_AGGREGATION_RESOURCES';
const FETCH_AGGREGATION_RESOURCES_SUCCESS = 'FETCH_AGGREGATION_RESOURCES_SUCCESS';
const FETCH_AGGREGATION_RESOURCES_ERROR = 'FETCH_AGGREGATION_RESOURCES_ERROR';

const FETCH_AGGREGATIONS_SUCCESS = 'FETCH_AGGREGATIONS_SUCCESS';
const FETCH_KEYWORD_WORKFLOW_SUCCESS = 'FETCH_KEYWORD_WORKFLOW_SUCCESS';

const TOGGLE_HINTS = 'TOGGLE_HINTS';
const CLEAR_AGGREGATIONS = 'CLEAR_AGGREGATIONS';

const AGGREGATIONS_STATUS = {
  IDLE: 'aggregations_status_idle',
  FETCHING: 'aggregations_status_fetching',
  READY: 'aggregations_status_ready',
  ERROR: 'aggregations_status_error'
};

const AGGREGATIONS_INITIAL_STATE = {
  data: null,
  showHints: true,
  status: AGGREGATIONS_STATUS.IDLE,
  keywordWorkflow: null
};

const AGGREGATIONS_PROP_TYPES = {
  data: PropTypes.object,
  showHints: PropTypes.bool,
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

    case TOGGLE_HINTS:
      return Object.assign({}, state, {
        showHints: action.showHints
      });

    case CLEAR_AGGREGATIONS:
      return AGGREGATIONS_INITIAL_STATE;

    default:
      return state;
  }
};

const explodeKey = (key, value) => {
  const keys = key.split('_');
  const fullObject = {};
  let temp = fullObject;
  while (keys.length) {
    temp[keys[0]] = (keys.length === 1) ? value : {};
    temp = temp[keys[0]];
    keys.shift();
  }
  return fullObject;
};

const toggleHints = () => {
  return (dispatch, getState) => {
    const showHints = !getState().aggregations.showHints;

    dispatch({
      type: TOGGLE_HINTS,
      showHints
    });
  };
};

const fetchAggregations = (subjectId, workflowId) => {
  if (!subjectId) return () => {};
  return (dispatch) => {

    const query = `{
      workflow(id: ${workflowId}) {
        subject_reductions(subjectId: ${subjectId}) {
          data
        }
      }
    }`;
    dispatch({ type: FETCH_AGGREGATION_RESOURCES });

    const fetchData = request(config.caesarHost, query)
      .then((data) => {
        let newData = {};
        data.workflow.subject_reductions.map((reduction) => {
          let item = {};
          Object.keys(reduction.data.frame0).map((key) => {
            const stuff = explodeKey(key, reduction.data.frame0[key]);
            item = merge(item, stuff);
          });
          newData = merge(item, newData);
        });
        dispatch({ type: FETCH_AGGREGATIONS_SUCCESS, aggregationData: newData });
      });

    const fetchKeywordWorkflow = apiClient.type('workflows').get({ id: config.keywordWorkflow })
      .then(([keywordWorkflow]) => {
        dispatch({ type: FETCH_KEYWORD_WORKFLOW_SUCCESS, keywordWorkflow });
      });

    Promise.all([fetchData, fetchKeywordWorkflow]).then(() => {
      dispatch({ type: FETCH_AGGREGATION_RESOURCES_SUCCESS });
    }).catch(() => {
      dispatch({ type: FETCH_AGGREGATION_RESOURCES_ERROR });
    });
  };
};

const clearAggregations = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_AGGREGATIONS });
  };
};

export default aggregationsReducer;

export {
  clearAggregations,
  fetchAggregations,
  toggleHints,
  AGGREGATIONS_INITIAL_STATE,
  AGGREGATIONS_STATUS,
  AGGREGATIONS_PROP_TYPES
};
