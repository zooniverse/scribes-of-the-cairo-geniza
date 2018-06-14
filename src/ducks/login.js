import oauth from 'panoptes-client/lib/oauth';
import { fetchPreferences } from './project';

// Action Types
const SET_LOGIN_USER = 'project/user/SET_LOGIN_USER';
const SET_ADMIN_FLAG = 'SET_ADMIN_FLAG';
const TOGGLE_ADMIN_MODE = 'TOGGLE_ADMIN_MODE';

// Reducer
const initialState = {
  adminMode: false,
  initialised: false,
  isAdmin: false,
  user: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_USER:
      return Object.assign({}, state, {
        user: action.user,
        initialised: true
      });

    case SET_ADMIN_FLAG:
      return Object.assign({}, state, {
        isAdmin: action.isAdmin
      });

    case TOGGLE_ADMIN_MODE:
      return Object.assign({}, state, {
        adminMode: action.adminMode
      });

    default:
      return state;
  }
};

// Action Creators
const isProjectAdmin = (user) => {
  return (dispatch, getState) => {
    const ACCEPTED_ROLES = ['owner', 'collaborator', 'expert', 'researcher', 'translator'];
    const project = getState().project.data;
    if (project && user) {
      project.get('project_roles', { user_id: user.id })
        .then(([projectRoles]) => {
          if (projectRoles.roles) {
            const isAdmin = projectRoles.roles.some(role => ACCEPTED_ROLES.indexOf(role) >= 0);
            dispatch({ type: SET_ADMIN_FLAG, isAdmin });
          }
        });
    } else {
      dispatch({ type: SET_ADMIN_FLAG, isAdmin: false });
    }
  };
};

const setLoginUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER,
      user
    });
    dispatch(fetchPreferences(user));
    dispatch(isProjectAdmin(user));
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

const toggleAdminMode = () => {
  return (dispatch, getState) => {
    const adminMode = !getState().login.adminMode;
    dispatch({
      type: TOGGLE_ADMIN_MODE,
      adminMode
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
  setLoginUser,
  toggleAdminMode
};
