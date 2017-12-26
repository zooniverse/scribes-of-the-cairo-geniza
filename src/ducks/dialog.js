const DEFAULT_SIZE = { height: 400, width: 600 };

const initialState = {
  data: null,
  enableResize: true,
  size: DEFAULT_SIZE,
  isPrompt: false
};

const SET_POPUP = 'SET_POPUP';

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPUP:
      return {
        data: action.dialog,
        enableResize: action.resize,
        size: action.size,
        title: action.title
      };

    default:
      return state;
  }
};

const toggleDialog = (dialog, title = '', resize = true, size = DEFAULT_SIZE) => {
  return (dispatch) => {
    dispatch({
      type: SET_POPUP,
      dialog,
      resize,
      size,
      title
    });
  };
};

export default dialogReducer;

export {
  toggleDialog
};
