import { KeyboardOptions } from '../lib/KeyboardTypes';

const LANGUAGES = {
  ARABIC: 'Arabic',
  HEBREW: 'Hebrew'
};

const initialState = {
  activeKey: null,
  activeLanguage: LANGUAGES.HEBREW,
  activeScript: KeyboardOptions[0],
  modern: true,
  showKeyboard: true,
  index: 0
};

const PRESSED_KEY = 'PRESSED_KEY';
const SET_KEYBOARD = 'SET_KEYBOARD';
const TOGGLE_KEYBOARD = 'TOGGLE_KEYBOARD';
const TOGGLE_MODERN = 'TOGGLE_MODERN';
const SET_LANGUAGE = 'SET_LANGUAGE';

const keyboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYBOARD:
      return Object.assign({}, state, {
        activeScript: action.activeScript,
        index: action.index
      });

    case TOGGLE_KEYBOARD:
      return Object.assign({}, state, {
        showKeyboard: action.keyboardState
      });

    case TOGGLE_MODERN:
      return Object.assign({}, state, {
        modern: action.modern
      });

    case PRESSED_KEY:
      return Object.assign({}, state, {
        activeKey: action.character
      });

    case SET_LANGUAGE:
      return Object.assign({}, state, {
        activeLanguage: action.language
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

const toggleKeyboard = (showKeyboard = false) => {
  return (dispatch, getState) => {
    let keyboardState = !getState().keyboard.showKeyboard;
    if (showKeyboard) { keyboardState = true; }

    dispatch({
      type: TOGGLE_KEYBOARD,
      keyboardState
    });
  };
};

const pressedKey = (character) => {
  return (dispatch) => {
    dispatch({
      type: PRESSED_KEY,
      character
    });
  };
};

const toggleLanguage = (language) => {
  return (dispatch) => {
    dispatch({
      type: SET_LANGUAGE,
      language
    });
  };
};

export default keyboardReducer;

export {
  LANGUAGES,
  pressedKey,
  setKeyboard,
  toggleLanguage,
  toggleKeyboard,
  toggleModern
};
