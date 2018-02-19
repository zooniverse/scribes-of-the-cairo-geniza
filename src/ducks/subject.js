import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';
import { createClassification } from './classification';
import { fetchAggregations } from './aggregations';

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
        queue: action.queue,
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
  dispatch(createClassification(subject));
  subject && dispatch(fetchAggregations(subject.id));
};

const fetchQueue = (id = config.workflowId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUBJECT
    });

    apiClient.type('subjects/queued').get({ workflow_id: id })
      .then((queue) => {
        const currentSubject = queue.shift();
        dispatch({
          currentSubject,
          favorite: currentSubject.favorite || false,
          type: FETCH_SUBJECT_SUCCESS,
          queue
        });
        prepareForNewSubject(dispatch, currentSubject);
      })
      .catch((err) => {
        console.error('ducks/subject.js fetchSubject() error: ', err);
        dispatch({ type: FETCH_SUBJECT_ERROR });
      });
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
  fetchQueue,
  subjectError,
  toggleFavorite,
  SUBJECT_STATUS
};
