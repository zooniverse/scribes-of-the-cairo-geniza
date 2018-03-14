import { KeyboardOptions, KEYBOARD_TYPES } from '../lib/KeyboardTypes';

const initialState = {
  activeCard: null,
  activeCardIndex: null,
  activeScript: KeyboardOptions[0],
  activeFilters: [
    KEYBOARD_TYPES.CURSIVE,
    KEYBOARD_TYPES.MINISCULE,
    KEYBOARD_TYPES.SQUARE
  ],
  referenceMode: true,
  scriptSelection: false
};

const TOGGLE_REFERENCE_MODE = 'TOGGLE_REFERENCE_MODE';
const ACTIVE_CARD = 'ACTIVE_CARD';
const CHANGE_KEYBOARD = 'CHANGE_KEYBOARD';
const SET_FILTERS = 'SET_FILTERS';
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
        activeScript: action.activeScript
      });

    case SET_FILTERS:
      return Object.assign({}, state, {
        activeFilters: action.activeFilters
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

const changeKeyboard = (activeScript) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_KEYBOARD,
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

const setFilters = (filter) => {
  return (dispatch, getState) => {
    let activeFilters = getState().cribSheet.activeFilters.slice();
    const index = activeFilters.indexOf(KEYBOARD_TYPES[filter]);
    const allActive = activeFilters.length === 3;

    if (index < 0) {
      activeFilters.push(KEYBOARD_TYPES[filter]);
    } else if (allActive) {
      activeFilters = [KEYBOARD_TYPES[filter]];
    } else {
      activeFilters.splice(index, 1);
    }

    if (filter === null) {
      activeFilters = initialState.activeFilters;
    }

    dispatch({
      type: SET_FILTERS,
      activeFilters
    });
  };
};

export default cribSheetReducer;

export {
  activateCard,
  changeKeyboard,
  setFilters,
  toggleReferenceMode,
  toggleScripts
};
