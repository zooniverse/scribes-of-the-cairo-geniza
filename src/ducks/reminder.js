const TOGGLE_REMINDER = 'TOGGLE_REMINDER';

const initialState = {
  node: null
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REMINDER:
      return Object.assign({}, state, {
        node: action.node
      });

    default:
      return state;
  }
};

const toggleReminder = (node) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_REMINDER,
      node
    });
  };
};

export default reminderReducer;

export {
  toggleReminder
};
