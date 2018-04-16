import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';
import { createClassification } from './classification';
import { resetAnnotations } from './annotations';

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
      return Object.assign({}, state, {
        queue: action.queue,
        currentSubject: action.currentSubject,
        favorite: action.favorite,
        status: SUBJECT_STATUS.READY
      });

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

const prepareForNewSubject = (dispatch, subject) => {
  dispatch(resetAnnotations());
  dispatch(createClassification(subject));
};

const fetchSubject = (initialFetch = false) => {
  return (dispatch, getState) => {
    if (initialFetch && getState().subject.status !== SUBJECT_STATUS.IDLE) return;
    const workflow_id = getState().workflow.id;

    dispatch({ type: FETCH_SUBJECT });

    const subjectQuery = { workflow_id };

    const fetchQueue = () => {
      apiClient.type('subjects/queued').get(subjectQuery)
        .then((queue) => {
          const currentSubject = queue.shift();
          dispatch({
            currentSubject,
            id: currentSubject.id,
            queue,
            type: FETCH_SUBJECT_SUCCESS,
            favorite: currentSubject.favorite || false
          });

          prepareForNewSubject(dispatch, currentSubject);
        })
        .catch((err) => {
          console.error('ducks/subject.js fetchSubject() error: ', err);
          dispatch({ type: FETCH_SUBJECT_ERROR });
        });
    };

    if (!getState().subject.queue.length) {
      fetchQueue();
    } else {
      const currentSubject = getState().subject.queue.shift();
      dispatch({
        currentSubject,
        id: currentSubject.id,
        queue: getState().subject.queue,
        type: FETCH_SUBJECT_SUCCESS,
        favorite: currentSubject.favorite || false
      });

      prepareForNewSubject(dispatch, currentSubject);
    }
  };
};

const subjectError = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SUBJECT_ERROR });
  };
};

const createFavorites = (project) => {
  const links = {
    subjects: [],
    projects: [config.projectId]
  };

  const display_name = (project.data) ? project.data.display_name : 'UNKNOWN PROJECT';
  const collection = {
    favorite: true,
    display_name,
    links
  };
  apiClient.type('collections')
    .create(collection)
    .save()
    .catch(err => Promise.reject(err));
};

const toggleFavorite = () => {
  return (dispatch, getState) => {
    const projectID = config.projectId;
    const favorite = getState().subject.favorite;
    const user = getState().login.user.login;
    const subject = getState().subject.currentSubject;
    dispatch({ type: TOGGLE_FAVORITE, favorite: !favorite });

    if (user) {
      apiClient.type('collections').get({
        project_ids: projectID,
        favorite: true,
        owner: user
      }).then(([collection]) => {
        if (collection && !favorite) {
          collection.addLink('subjects', [subject.id.toString()]);
        } else if (collection && favorite) {
          collection.removeLink('subjects', [subject.id.toString()]);
        } else {
          createFavorites(getState().project);
        }
      });
    }
  };
};

export default subjectReducer;

export {
  fetchSubject,
  subjectError,
  toggleFavorite,
  SUBJECT_STATUS
};
