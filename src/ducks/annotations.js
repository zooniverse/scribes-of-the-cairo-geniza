import { SUBJECTVIEWER_STATE, setViewerState } from './subject-viewer';

const ADD_ANNOTATION_POINT = 'ADD_ANNOTATION_POINT';
const COMPLETE_ANNOTATION = 'COMPLETE_ANNOTATION';
const UPDATE_TEXT = 'UPDATE_TEXT';
const SELECT_ANNOTATION = 'SELECT_ANNOTATION';
const UNSELECT_ANNOTATION = 'UNSELECT_ANNOTATION';
const DELETE_SELECTED_ANNOTATION = 'DELETE_SELECTED_ANNOTATION';
const RESET_ANNOTATIONS = 'RESET_ANNOTATIONS';
const LOAD_ANNOTATIONS = 'LOAD_ANNOTATIONS';

const ANNOTATION_STATUS = {
  IDLE: 'annotation_status_idle',
  IN_PROGRESS: 'annotation_status_in_progress'
};

const initialState = {
  annotationInProgress: null,
  annotationBoxPosition: null,
  annotations: [],
  selectedAnnotation: null,
  selectedAnnotationIndex: null,
  status: ANNOTATION_STATUS.IDLE
};

const annotationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ANNOTATIONS:
      return initialState;

    case LOAD_ANNOTATIONS:
      return {
        annotationInProgress: null,
        annotationBoxPosition: null,
        annotations: action.annotations,
        selectedAnnotation: null,
        selectedAnnotationIndex: null,
        status: ANNOTATION_STATUS.IDLE
      };

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

    case UPDATE_TEXT: {
      const newDetails = [{ value: action.text }];
      const annotationCopy = state.annotations.slice();
      const updatedAnnotation = annotationCopy[state.selectedAnnotationIndex];
      updatedAnnotation.details = newDetails;

      return Object.assign({}, state, {
        annotations: annotationCopy
      });
    }

    case SELECT_ANNOTATION: {
      const selectedAnnotation = action.annotation ? action.annotation : null;
      const annotationBoxPosition = selectedAnnotation.points[selectedAnnotation.points.length - 1];
      return Object.assign({}, state, {
        selectedAnnotation,
        annotationBoxPosition,
        selectedAnnotationIndex: action.index
      });
    }

    case UNSELECT_ANNOTATION: {
      return Object.assign({}, state, {
        annotationBoxPosition: null,
        selectedAnnotation: null,
        selectedAnnotationIndex: null
      });
    }

    case DELETE_SELECTED_ANNOTATION: {
      let filteredAnnotations = [];
      if (state.annotations && state.selectedAnnotationIndex !== null) {
        filteredAnnotations = state.annotations.filter((item, index) => {
          return index !== state.selectedAnnotationIndex;
        });
      }
      return Object.assign({}, state, {
        annotations: filteredAnnotations,
        annotationBoxPosition: null,
        selectedAnnotation: null,
        selectedAnnotationIndex: null
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

const selectAnnotation = (index) => {
  return (dispatch, getState) => {
    const annotation = getState().annotations.annotations[index];
    if (annotation && getState().annotations.selectedAnnotation) return;
    dispatch({
      type: SELECT_ANNOTATION,
      annotation,
      index
    });

    dispatch(setViewerState(SUBJECTVIEWER_STATE.IDLE));
  };
};

const completeAnnotation = () => {
  return (dispatch) => {
    dispatch({
      type: COMPLETE_ANNOTATION
    });
    dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  };
};

const updateText = (text) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TEXT,
      text
    });
  };
};

const unselectAnnotation = () => {
  return (dispatch) => {
    dispatch({
      type: UNSELECT_ANNOTATION
    });

    dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  };
};

const deleteSelectedAnnotation = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SELECTED_ANNOTATION
    });

    dispatch(setViewerState(SUBJECTVIEWER_STATE.ANNOTATING));
  };
};

/*  Loads existing annotations data, usually via the WorkInProgress library.
 */
const loadAnnotations = (annotations) => {
  return (dispatch) => {
    dispatch({ type: LOAD_ANNOTATIONS, annotations });
  };
};

const resetAnnotations = () => {
  return (dispatch) => {
    dispatch({ type: RESET_ANNOTATIONS });
  };
};

export default annotationsReducer;

export {
  addAnnotationPoint, completeAnnotation,
  deleteSelectedAnnotation, loadAnnotations, resetAnnotations,
  selectAnnotation, updateText, unselectAnnotation
};
