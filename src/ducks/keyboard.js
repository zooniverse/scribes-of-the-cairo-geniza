import { KeyboardOptions } from '../lib/KeyboardTypes';

const initialState = {
  activeScript: KeyboardOptions[0],
  modern: true,
  showKeyboard: true,
  index: 0
};

const SET_KEYBOARD = 'SET_KEYBOARD';
const TOGGLE_KEYBOARD = 'TOGGLE_KEYBOARD';
const TOGGLE_MODERN = 'TOGGLE_MODERN';

const keyboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYBOARD:
      return Object.assign({}, state, {
        activeScript: action.activeScript,
        index: action.index
      });

    case TOGGLE_KEYBOARD:
      return Object.assign({}, state, {
        showKeyboard: action.showKeyboard
      });

    case TOGGLE_MODERN:
      return Object.assign({}, state, {
        modern: action.modern
      });

    default:
      return state;
  }
};

const setKeyboard = (index) => {
  return (dispatch) => {
    const activeScript = KeyboardOptions[index];

    dispatch({
      type: SET_KEYBOARD,
      activeScript,
      index
    });
  };
};

const toggleModern = (setToFalse = false) => {
  return (dispatch, getState) => {
    let modern = !getState().keyboard.modern;
    if (setToFalse) { modern = false; }

    dispatch({
      type: TOGGLE_MODERN,
      modern
    });
  };
};

const toggleKeyboard = () => {
  return (dispatch, getState) => {
    const showKeyboard = !getState().keyboard.showKeyboard;

    dispatch({
      type: TOGGLE_KEYBOARD,
      showKeyboard
    });
  };
};

export default keyboardReducer;

export {
  setKeyboard,
  toggleKeyboard,
  toggleModern
};
