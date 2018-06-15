const TOGGLE_REMINDER = 'TOGGLE_REMINDER';
const TOGGLE_START_REMINDER = 'TOGGLE_START_REMINDER';
const TOGGLE_MARK_REMINDER = 'TOGGLE_MARK_REMINDER';

const initialState = {
  node: null,
  shownBeginReminder: false,
  shownMarkReminder: false
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REMINDER:
      return Object.assign({}, state, {
        node: action.node
      });

    case TOGGLE_START_REMINDER:
      return Object.assign({}, state, {
        shownBeginReminder: true
      });

    case TOGGLE_MARK_REMINDER:
      return Object.assign({}, state, {
        shownMarkReminder: true
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

const shownStartReminder = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_START_REMINDER });
  };
};

const shownMarkReminder = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MARK_REMINDER });
  };
};

export default reminderReducer;

export {
  shownMarkReminder,
  shownStartReminder,
  toggleReminder
};
