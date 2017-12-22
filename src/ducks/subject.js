import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

// Action Types
const FETCH_SUBJECT = 'FETCH_SUBJECT';
const FETCH_SUBJECT_SUCCESS = 'FETCH_SUBJECT_SUCCESS';
const FETCH_SUBJECT_ERROR = 'FETCH_SUBJECT_ERROR';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Reducer
const SUBJECT_STATUS = {
  IDLE: 'subject_status_idle',
  FETCHING: 'subject_status_fetching',
  READY: 'subject_status_ready',
  ERROR: 'subject_status_error'
};

const initialState = {
  currentSubject: null,
  favorite: false,
  queue: [],
  status: SUBJECT_STATUS.IDLE
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBJECT:
      return Object.assign({}, state, {
        status: SUBJECT_STATUS.FETCHING
      });

    case FETCH_SUBJECT_SUCCESS:
      return {
        currentSubject: action.currentSubject,
        favorite: action.favorite,
        queue: action.queue,
        status: SUBJECT_STATUS.READY
      };

    case FETCH_SUBJECT_ERROR:
      return Object.assign({}, state, {
        status: SUBJECT_STATUS.ERROR
      });

    case TOGGLE_FAVORITE:
      return Object.assign({}, state, {
        favorite: action.favorite
      });

    default:
      return state;
  }
};

const fetchQueue = (id = config.workflowId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUBJECT
    });

    apiClient.type('subjects/queued').get({ workflow_id: id})
      .then((queue) => {
        const currentSubject = queue.shift();
        dispatch({
          currentSubject,
          favorite: currentSubject.favorite || false,
          queue,
          type: FETCH_SUBJECT_SUCCESS
        });
      })
      .catch(() => {
        dispatch({ type: FETCH_SUBJECT_ERROR });
      });
  };
};

const createFavorites = (project) => {
  const links = {
    subjects: [],
    projects: [project.id]
  };
  const display_name = (project) ? project.display_name : 'UNKNOWN PROJECT';
  const collection = {
    favorite: true,
    display_name,
    links
  };
  apiClient.type('collections')
    .create(collection)
    .save()
    .catch((err) => {
      Promise.reject(err);
    });
};

const toggleFavorite = () => {
  return (dispatch, getState) => {
    const projectId = getState().project.id;
    const favorite = getState().subject.favorite;
    const user = getState().login.user.login;
    const subject = getState().subject.currentSubject;
    dispatch({ type: TOGGLE_FAVORITE, favorite: !favorite });

    if (user) {
      apiClient.type('collections').get({
        project_ids: projectId,
        favorite: true,
        owner: user
      }).then(([collection]) => {
        if (collection && !favorite) {
          collection.addLink('subjects', [subject.id.toString()]);
        } else if (collection && favorite) {
          collection.removeLink('subjects', [subject.id.toString()]);
        } else {
          createFavorites(getState().project.data);
        }
      });
    }
  };
};

export default subjectReducer;

export {
  fetchQueue,
  toggleFavorite
};
