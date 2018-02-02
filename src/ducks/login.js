import oauth from 'panoptes-client/lib/oauth';
import { fetchPreferences } from './project';

// Action Types
const SET_LOGIN_USER = 'project/user/SET_LOGIN_USER';

// Reducer
const initialState = {
  user: null,
  initialised: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_USER:
      return {
        user: action.user,
        initialised: true
      };

    default:
      return state;
  }
};

// Action Creators
const setLoginUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER,
      user
    });
    dispatch(fetchPreferences(user));
  };
};


const checkLoginUser = () => {
  // First thing on app load - check if the user is logged in.
  return (dispatch) => {
    oauth.checkCurrent()
      .then((user) => {
        dispatch(setLoginUser(user));
      });
  };
};

const loginToPanoptes = () => {
  return (() => oauth.signIn(computeRedirectURL(window)));
};

const logoutFromPanoptes = () => {
  return (dispatch) => {
    oauth.signOut()
      .then((user) => {
        dispatch(setLoginUser(user));
      });
  };
};

// Helper functions
const computeRedirectURL = (window) => {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
};

export default loginReducer;

export {
  checkLoginUser,
  loginToPanoptes,
  logoutFromPanoptes,
  setLoginUser
};
