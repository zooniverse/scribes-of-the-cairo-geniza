const DEFAULT_SIZE = { height: 450, width: 600 };

const initialState = {
  data: null,
  isPrompt: false,
  popup: null,
  size: DEFAULT_SIZE,
  title: '',
  type: null
};

const SET_DIALOG = 'SET_DIALOG';
const SET_POPUP = 'SET_POPUP';

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

export default dialogReducer;

export {
  toggleDialog,
  togglePopup
};
