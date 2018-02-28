const MIN_SCALING = 0.1;
const MAX_SCALING = 10;

const SUBJECTVIEWER_STATE = {
  ANNOTATING: 'annotating',
  CROPPING: 'cropping',
  NAVIGATING: 'navigating'
};

const initialState = {
  contrast: false,
  frame: 0,
  imageSize: { width: 0, height: 0 },
  rotation: 0,
  scaling: 1,
  translationX: 0,
  translationY: 0,
  viewerSize: { width: 0, height: 0 },
  viewerState: SUBJECTVIEWER_STATE.NAVIGATING
};

const RESET_VIEW = 'RESET_VIEW';
const SET_ROTATION = 'SET_ROTATION';
const SET_SCALING = 'SET_SCALING';
const SET_TRANSLATION = 'SET_TRANSLATION';
const TOGGLE_CONTRAST = 'TOGGLE_CONTRAST';
const SET_VIEWER_STATE = 'SET_VIEWER_STATE';
const UPDATE_IMAGE_SIZE = 'UPDATE_IMAGE_SIZE';
const UPDATE_VIEWER_SIZE = 'UPDATE_VIEWER_SIZE';

const subjectViewerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_VIEW: {
      let bestFitScale = 1;
      if (state.viewerSize.width && state.viewerSize.height &&
          state.imageSize.width && state.imageSize.height) {
        bestFitScale = Math.min(
          state.viewerSize.width / state.imageSize.width,
          state.viewerSize.height / state.imageSize.height
        );
      }

      // Zoom out some to ensure the user this is a subject to annotate
      bestFitScale -= 0.025;

      return Object.assign({}, state, {
        contrast: false,
        rotation: 0,
        scaling: bestFitScale,
        translationX: 0,
        translationY: 0
      });
    }

    case TOGGLE_CONTRAST: {
      return Object.assign({}, state, {
        contrast: !state.contrast
      });
    }

    case SET_ROTATION: {
      let newAngle = action.angle;
      while (newAngle < 0) { newAngle += 360; }
      newAngle %= 360;

      return Object.assign({}, state, {
        rotation: newAngle
      });
    }

    case SET_SCALING: {
      let newScale = (action.scale) ? action.scale : state.scaling;
      newScale = Math.max(MIN_SCALING, Math.min(MAX_SCALING, newScale));

      return Object.assign({}, state, {
        scaling: newScale
      });
    }

    case SET_TRANSLATION: {
      return Object.assign({}, state, {
        translationX: action.x,
        translationY: action.y
      });
    }

    case SET_VIEWER_STATE:
      return Object.assign({}, state, {
        viewerState: action.viewerState
      });

    case UPDATE_IMAGE_SIZE:
      return Object.assign({}, state, {
        imageSize: {
          width: action.width,
          height: action.height
        }
      });

    case UPDATE_VIEWER_SIZE: {
      let bestFitScaled = 1;
      if (action.width && action.height &&
          action.imageSize.width && action.imageSize.height) {
        bestFitScaled = Math.min(
          action.width / action.imageSize.width,
          action.height / action.imageSize.height
        );
      }

      return Object.assign({}, state, {
        scaling: bestFitScaled,
        viewerSize: {
          width: action.width,
          height: action.height
        }
      });
    }

    default: {
      return state;
    }
  }
};

const resetView = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_VIEW
    });
  };
};

const setTranslation = (x, y) => {
  return (dispatch) => {
    dispatch({
      type: SET_TRANSLATION,
      x, y
    });
  };
};

const setViewerState = (viewerState) => {
  return (dispatch) => {
    dispatch({
      type: SET_VIEWER_STATE,
      viewerState
    });
  };
};

const updateImageSize = (width, height) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_IMAGE_SIZE,
      width, height,
    });
  };
};

const updateViewerSize = (width, height) => {
  return (dispatch, getState) => {
    const imageSize = getState().subjectViewer.imageSize;

    dispatch({
      type: UPDATE_VIEWER_SIZE,
      width, height, imageSize
    });
  };
};

const setRotation = (angle) => {
  return (dispatch) => {
    dispatch({
      type: SET_ROTATION,
      angle
    });
  };
};

const setScaling = (scale) => {
  return (dispatch) => {
    dispatch({
      type: SET_SCALING,
      scale
    });
  };
};

const toggleContrast = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CONTRAST
    });
  };
};

export default subjectViewerReducer;

export {
  resetView,
  setRotation,
  setScaling,
  setTranslation,
  toggleContrast,
  setViewerState,
  updateImageSize,
  updateViewerSize,
  SUBJECTVIEWER_STATE
};
