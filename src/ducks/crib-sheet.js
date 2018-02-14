const initialState = {
  activeCard: null,
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
        activeCard: action.activeCard
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

const activateCard = (activeCard) => {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_CARD,
      activeCard
    });
  };
};

export default cribSheetReducer;

export {
  activateCard,
  toggleReferenceMode
};
