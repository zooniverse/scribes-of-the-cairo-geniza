const DEFAULT_SIZE = { height: 450, width: 600 };

const initialState = {
  data: null,
  size: DEFAULT_SIZE,
  isPrompt: false
};

const SET_DIALOG = 'SET_DIALOG';

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG:
      return {
        data: action.dialog,
        size: action.size,
        title: action.title
      };

    default:
      return state;
  }
};

const toggleDialog = (dialog, title = '', size = DEFAULT_SIZE) => {
  return (dispatch) => {
    dispatch({
      type: SET_DIALOG,
      dialog,
      size,
      title
    });
  };
};

export default dialogReducer;

export {
  toggleDialog
};
