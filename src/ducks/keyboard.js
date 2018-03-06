const initialState = {
  modern: true,
  title: 'Ashkenazi Square'
};

const SET_KEYBOARD = 'SET_KEYBOARD';
const TOGGLE_MODERN = 'TOGGLE_MODERN';

const keyboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYBOARD:
      return Object.assign({}, state, {
        title: ''
      });

    case TOGGLE_MODERN:
      return Object.assign({}, state, {
        modern: action.modern
      });

    default:
      return state;
  }
};

const setKeyboard = () => {
  return (dispatch) => {
    dispatch({
      type: SET_KEYBOARD
    });
  };
};

const toggleModern = () => {
  return (dispatch, getState) => {
    const modern = !getState().keyboard.modern;

    dispatch({
      type: TOGGLE_MODERN,
      modern
    });
  };
};

export default keyboardReducer;

export {
  setKeyboard,
  toggleModern
};
