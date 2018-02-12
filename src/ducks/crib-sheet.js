const initialState = {
  referenceMode: true
};

const TOGGLE_REFERENCE_MODE = 'TOGGLE_REFERENCE_MODE';

const cribSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REFERENCE_MODE:
      return Object.assign({}, state, {
        referenceMode: action.referenceMode
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

export default cribSheetReducer;

export {
  toggleReferenceMode
};
