const initialState = {
  activeCard: null,
  activeCardIndex: null,
  referenceMode: true
};

const TOGGLE_REFERENCE_MODE = 'TOGGLE_REFERENCE_MODE';
const ACTIVE_CARD = 'ACTIVE_CARD';

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

export default cribSheetReducer;

export {
  activateCard,
  toggleReferenceMode
};
