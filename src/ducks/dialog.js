const DEFAULT_SIZE = { height: 450, width: 600 };

const initialState = {
  annotationPane: null,
  annotationPaneSize: DEFAULT_SIZE,
  annotationPaneOffset: null,
  data: null,
  focus: null,
  isPrompt: false,
  popup: null,
  size: DEFAULT_SIZE,
  title: '',
  type: null
};

const SET_DIALOG = 'SET_DIALOG';
const SET_POPUP = 'SET_POPUP';
const SET_ANNOTATION_PANE = 'SET_ANNOTATION_PANE';
const SET_FOCUS = 'SET_FOCUS';

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG:
      return Object.assign({}, state, {
        data: action.dialog,
        size: action.size,
        title: action.title,
        component: action.component
      });

    case SET_POPUP:
      return Object.assign({}, state, {
        popup: action.popup
      });

    case SET_ANNOTATION_PANE:
      return Object.assign({}, state, {
        annotationPane: action.dialog,
        annotationPaneSize: action.annotationPaneSize,
        annotationPaneOffset: action.annotationPaneOffset
      });

    case SET_FOCUS:
      return Object.assign({}, state, {
        focus: action.component
      });

    default:
      return state;
  }
};

const toggleDialog = (dialog, title = '', size = DEFAULT_SIZE, component = null) => {
  return (dispatch) => {
    dispatch({
      type: SET_DIALOG,
      dialog,
      size,
      title,
      component
    });
  };
};

const togglePopup = (popup) => {
  return (dispatch) => {
    dispatch({
      type: SET_POPUP,
      popup
    });
  };
};

const toggleAnnotation = (dialog, annotationPaneSize = DEFAULT_SIZE, annotationPaneOffset = null) => {
  return (dispatch) => {
    dispatch({
      type: SET_ANNOTATION_PANE,
      dialog,
      annotationPaneSize,
      annotationPaneOffset
    });
  };
};

const toggleFocus = (component) => {
  return (dispatch) => {
    dispatch({
      type: SET_FOCUS,
      component
    });
  };
};

export default dialogReducer;

export {
  toggleFocus,
  toggleAnnotation,
  toggleDialog,
  togglePopup
};
