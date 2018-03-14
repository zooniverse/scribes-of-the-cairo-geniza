import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

// Action Types
const FETCH_PREFERENCES = 'FETCH_PREFERENCES';
const FETCH_PROJECT = 'FETCH_PROJECT';
const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';

const PROJECT_STATUS = {
  IDLE: 'project_status_idle',
  FETCHING: 'project_status_fetching',
  READY: 'project_status_ready',
  ERROR: 'project_status_error'
};

// Reducer
const initialState = {
  data: null,
  status: PROJECT_STATUS.IDLE,
  userPreferences: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERENCES:
      return Object.assign({}, state, {
        userPreferences: action.preferences
      });

    case FETCH_PROJECT:
      return Object.assign({}, state, {
        status: PROJECT_STATUS.FETCHING
      });

    case FETCH_PROJECT_SUCCESS:
      return {
        status: PROJECT_STATUS.READY,
        data: action.data
      };

    case FETCH_PROJECT_ERROR:
      return Object.assign({}, state, {
        status: PROJECT_STATUS.ERROR
      });

    default:
      return state;
  }
};

const fetchProject = (id = config.projectId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROJECT });

    return apiClient.type('projects').get(id)
      .then((project) => {
        dispatch({
          type: FETCH_PROJECT_SUCCESS,
          data: project
        });
      })
      .catch(() => {
        dispatch({ type: FETCH_PROJECT_ERROR });
      });
  };
};

const fetchPreferences = (user) => {
  return (dispatch) => {
    if (user) {
      user.get('project_preferences', { project_id: config.projectId })
        .then(([preferences]) => {
          if (preferences) {
            dispatch({
              type: FETCH_PREFERENCES,
              preferences
            });
          } else {
            apiClient.type('project_preferences').create({
              links: { project: config.projectId },
              preferences: {}
            }).save()
              .then((newPreferences) => {
                dispatch({
                  type: FETCH_PREFERENCES,
                  preferences: newPreferences
                });
              }).catch((err) => {
                console.warn(err.message);
              });
          }
        });
    } else {
      Promise.resolve(apiClient.type('project_preferences').create({
        id: 'GUEST_PREFERENCES_DO_NOT_SAVE',
        links: { project: config.projectId },
        preferences: {}
      })).then((preferences) => {
        dispatch({
          type: FETCH_PREFERENCES,
          preferences
        });
      });
    }
  };
};

export default projectReducer;

export {
  fetchProject,
  fetchPreferences,
  PROJECT_STATUS
};
