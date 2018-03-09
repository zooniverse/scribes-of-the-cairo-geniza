import { KeyboardOptions } from '../lib/KeyboardTypes';

const initialState = {
  activeScript: KeyboardOptions[0],
  modern: true,
  index: 0
};

const SET_KEYBOARD = 'SET_KEYBOARD';
const TOGGLE_MODERN = 'TOGGLE_MODERN';

const keyboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYBOARD:
      return Object.assign({}, state, {
        activeScript: action.activeScript,
        index: action.index
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
