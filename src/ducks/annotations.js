const ADD_ANNOTATION_POINT = 'ADD_ANNOTATION_POINT';
const COMPLETE_ANNOTATION = 'COMPLETE_ANNOTATION';

const ANNOTATION_STATUS = {
  IDLE: 'annotation_status_idle',
  IN_PROGRESS: 'annotation_status_in_progress'
};

const initialState = {
  annotationInProgress: null,
  annotationPanePosition: null,
  annotations: [],
  selectedAnnotation: null,
  status: ANNOTATION_STATUS.IDLE
};

const annotationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANNOTATION_POINT: {
      const annotationInProgress = (state.annotationInProgress)
        ? Object.assign({}, state.annotationInProgress)
        : { details: [{ value: '' }], points: [], frame: action.frame };
      annotationInProgress.points.push({ x: action.x, y: action.y });
      return Object.assign({}, state, {
        status: ANNOTATION_STATUS.IN_PROGRESS,
        annotationInProgress
      });
    }

    case COMPLETE_ANNOTATION: {
      const annotations = (state.annotations)
        ? state.annotations.splice(0)
        : [];
      annotations.push(state.annotationInProgress);
      return Object.assign({}, state, {
        status: ANNOTATION_STATUS.IDLE,
        annotationInProgress: null,
        annotations,
        selectedAnnotation: state.annotationInProgress,
        selectedAnnotationIndex: annotations.length - 1
      });
    }

    default:
      return state;
  }
};

const addAnnotationPoint = (x, y, frame) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ANNOTATION_POINT,
      x,
      y,
      frame
    });
  };
};

const completeAnnotation = () => {
  return (dispatch) => {
    dispatch({
      type: COMPLETE_ANNOTATION
    });
  };
};

export default annotationsReducer;

export {
  addAnnotationPoint, completeAnnotation
};
