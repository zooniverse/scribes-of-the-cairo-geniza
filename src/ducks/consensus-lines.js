import PropTypes from 'prop-types';
import { request } from 'graphql-request';
import { config, CONSENSUS_SCORE_TO_RETIRE, MINIMUM_VIEW_TO_RETIRE } from '../config';

const FETCH_CONSENSUS_LINE_RESOURCES = 'FETCH_CONSENSUS_LINE_RESOURCES';
const FETCH_CONSENSUS_LINE_RESOURCES_SUCCESS = 'FETCH_CONSENSUS_LINE_RESOURCES_SUCCESS';
const FETCH_CONSENSUS_LINE_RESOURCES_ERROR = 'FETCH_CONSENSUS_LINE_RESOURCES_ERROR';

const CONSENSUS_LINE_STATUS = {
  IDLE: 'consensus_line_status_idle',
  FETCHING: 'consensus_line_status_fetching',
  READY: 'consensus_line_status_ready',
  ERROR: 'consensus_line_status_error'
};

const CONSENSUS_LINES_INITIAL_STATE = {
  marks: null,
  status: CONSENSUS_LINE_STATUS.IDLE
};

const CONSENSUS_LINE_PROP_TYPES = {
  marks: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string
};

const aggregationsReducer = (state = CONSENSUS_LINES_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONSENSUS_LINE_RESOURCES:
      return Object.assign({}, state, {
        data: null,
        status: CONSENSUS_LINE_STATUS.FETCHING
      });

    case FETCH_CONSENSUS_LINE_RESOURCES_SUCCESS:
      return Object.assign({}, state, {
        marks: action.marks,
        status: CONSENSUS_LINE_STATUS.READY
      });

    case FETCH_CONSENSUS_LINE_RESOURCES_ERROR:
      return Object.assign({}, state, {
        status: CONSENSUS_LINE_STATUS.ERROR
      });

    default:
      return state;
  }
};

const constructCoordinates = (line) => {
  const points = [];
  if (line && line.clusters_x && line.clusters_y) {
    line.clusters_x.map((point, i) => {
      points.push({ x: line.clusters_x[i], y: line.clusters_y[i] });
    });
  }
  return points;
};

const constructLines = (reductions, frame) => {
  const clusteredLines = reductions || [];
  const consensusLines = [];

  clusteredLines.map((reduction) => {
    const currentFrameLines = reduction.data[`frame${frame}`];

    if (currentFrameLines) {
      currentFrameLines.map((annotation, i) => {
        const points = constructCoordinates(annotation);
        const data = {
          points,
          frame,
          consensusReached:
            annotation.consensus_score >= CONSENSUS_SCORE_TO_RETIRE ||
            annotation.number_views >= MINIMUM_VIEW_TO_RETIRE
        };
        consensusLines.push(data);
      });
    }
  });
  return consensusLines;
};

const fetchConsensusLines = (subjectId, workflowId) => {
  if (!subjectId) return () => {};
  return (dispatch, getState) => {
    const query = `{
      workflow(id: ${workflowId}) {
        subject_reductions(subjectId: ${subjectId}, reducerKey:"${config.consensusLineReductions[workflowId]}") {
          data
        }
      }
    }`;
    dispatch({ type: FETCH_CONSENSUS_LINE_RESOURCES });

    request(config.caesarHost, query)
      .then((data) => {
        const frame = getState().subjectViewer.frame;
        const marks = constructLines(data.workflow.subject_reductions, frame);
        dispatch({
          type: FETCH_CONSENSUS_LINE_RESOURCES_SUCCESS,
          marks
        });
      })
      .catch((err) => {
        console.warn(err);
        dispatch({ type: FETCH_CONSENSUS_LINE_RESOURCES_ERROR });
      });
  };
};

export default aggregationsReducer;

export {
  fetchConsensusLines
};
