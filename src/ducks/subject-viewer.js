const MIN_SCALING = 0.1;
const MAX_SCALING = 10;

const initialState = {
  frame: 0,
  imageSize: { width: 0, height: 0 },
  rotation: 0,
  scaling: 1,
  translationX: 0,
  translationY: 0,
  viewerSize: { width: 0, height: 0 },
};

const RESET_VIEW = 'RESET_VIEW';
const UPDATE_IMAGE_SIZE = 'UPDATE_IMAGE_SIZE';
const UPDATE_VIEWER_SIZE = 'UPDATE_VIEWER_SIZE';

const subjectViewerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_VIEW:
      let bestFitScale = 1;
      if (state.viewerSize.width && state.viewerSize.height &&
          state.imageSize.width && state.imageSize.height) {
        bestFitScale = Math.min(
          state.viewerSize.width / state.imageSize.width,
          state.viewerSize.height / state.imageSize.height
        );
      }

      return Object.assign({}, state, {
        rotation: 0,
        scaling: bestFitScale,
        translationX: 0,
        translationY: 0,
      });

    case UPDATE_IMAGE_SIZE:
      return Object.assign({}, state, {
        imageSize: {
          width: action.width,
          height: action.height,
        },
      });

    case UPDATE_VIEWER_SIZE:
      return Object.assign({}, state, {
        viewerSize: {
          width: action.width,
          height: action.height,
        },
      });

    default:
      return state;
  }
};

const resetView = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_VIEW,
    });
  }
};

const updateImageSize = (width, height) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_IMAGE_SIZE,
      width, height,
    });
  }
};

const updateViewerSize = (width, height) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_VIEWER_SIZE,
      width, height,
    });
  }
};

export default subjectViewerReducer;

export {
  resetView,
  updateImageSize,
  updateViewerSize
};
