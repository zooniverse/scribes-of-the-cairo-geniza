import { KeyboardOptions } from '../lib/KeyboardTypes';

const initialState = {
  activeCard: null,
  activeCardIndex: null,
  activeScript: KeyboardOptions[0],
  activeIndex: 0,
  referenceMode: true,
  scriptSelection: false
};

const TOGGLE_REFERENCE_MODE = 'TOGGLE_REFERENCE_MODE';
const ACTIVE_CARD = 'ACTIVE_CARD';
const CHANGE_KEYBOARD = 'CHANGE_KEYBOARD';
const TOGGLE_SCRIPTS = 'TOGGLE_SCRIPTS';

const cribSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REFERENCE_MODE:
      return Object.assign({}, state, {
        referenceMode: action.referenceMode
      });

    case ACTIVE_CARD:
      return Object.assign({}, state, {
        activeCard: action.activeCard,
        activeCardIndex: action.activeCardIndex
      });

    case CHANGE_KEYBOARD:
      return Object.assign({}, state, {
        activeIndex: action.activeIndex,
        activeScript: action.activeScript
      });

    case TOGGLE_SCRIPTS:
      return Object.assign({}, state, {
        scriptSelection: action.newState
      });

    default:
      return state;
  }
};

const toggleReferenceMode = (referenceMode) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_REFERENCE_MODE,
      referenceMode
    });
  };
};

const activateCard = (activeCard, activeCardIndex = null) => {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_CARD,
      activeCard,
      activeCardIndex
    });
  };
};

const changeKeyboard = (activeIndex) => {
  const activeScript = KeyboardOptions[activeIndex];

  return (dispatch) => {
    dispatch({
      type: CHANGE_KEYBOARD,
      activeIndex,
      activeScript
    });
  };
};

const toggleScripts = () => {
  return (dispatch, getState) => {
    const newState = !getState().cribSheet.scriptSelection;

    dispatch({
      type: TOGGLE_SCRIPTS,
      newState
    });
  };
};

export default cribSheetReducer;

export {
  activateCard,
  changeKeyboard,
  toggleReferenceMode,
  toggleScripts
};
