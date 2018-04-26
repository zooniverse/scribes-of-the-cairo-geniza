import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../config';

import { resetAnnotations } from './annotations';
import { createClassification } from './classification';

// Action Types
const RESET_SUBJECT = 'FETCH_SUBJECT';
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
  id: null,
  favorite: false,
  queue: [],
  status: SUBJECT_STATUS.IDLE
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SUBJECT:
      return initialState;

    case FETCH_SUBJECT:
      return Object.assign({}, state, {
        currentSubject: null,
        id: action.id,
        favorite: false,
        status: SUBJECT_STATUS.FETCHING
      });

    case FETCH_SUBJECT_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        queue: action.queue,
        currentSubject: action.currentSubject,
        favorite: action.favorite,
        status: SUBJECT_STATUS.READY
      });

    case FETCH_SUBJECT_ERROR:
      return Object.assign({}, state, {
        currentSubject: null,
        id: null,
        favorite: false,
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

/*  Fetches a Zooniverse subject from Panoptes.
    - subjectId: OPTIONAL. ID of the subject, as a string. e.g.: "1234"
        If unspecified (undefined), fetches from list of queued subjects.
   */
const fetchSubject = (subjectId = null) => {
  return (dispatch, getState) => {
    const workflow_id = getState().workflow.id;
    
    if (!workflow_id) {
      console.error('ducks/subjects.js fetchSubject() error: no Workflow ID');
      return;
    }

    //Fetch Specific Subject
    if (subjectId) {
      
      //Store update: enter "fetching" state.
      dispatch({ type: FETCH_SUBJECT, id: subjectId });

      //Asynchronous action
      return apiClient.type('subjects').get(subjectId)
        .then((currentSubject) => {
          //Store update: enter "success" state and save fetched data.
          dispatch({
            currentSubject,
            id: currentSubject.id,
            queue: [],
            type: FETCH_SUBJECT_SUCCESS,
            favorite: currentSubject.favorite || false
          });

          //onSuccess(), prepare for a new subject.
          dispatch(prepareForNewSubject(currentSubject));
        })

        .catch((err)=>{
          //Store update: enter "error" state.
          dispatch({ type: FETCH_SUBJECT_ERROR });
        });
    
    //Fetch Next Subject In Queue
    } else {
      
      const subjectQuery = { workflow_id };

      // TODO What if the fetched queue is empty?
      // Is there a queue and are there subjects in the queue?
      
      //If there's an empty queue, fetch a new one.
      if (!getState().subject.queue.length) {

        return apiClient.type('subjects/queued').get(subjectQuery)
          .then((queue) => {
            const updatedQueue = queue.slice();  //Make a copy of the queue
            const currentSubject = updatedQueue.shift();

            //Store update: enter "success" state and save fetched data.
            dispatch({
              currentSubject,
              id: currentSubject.id,
              queue: updatedQueue,
              type: FETCH_SUBJECT_SUCCESS,
              favorite: currentSubject.favorite || false
            });

            //onSuccess(), prepare for a new subject.
            dispatch(prepareForNewSubject(currentSubject));
          })
          .catch((err) => {
            console.error('ducks/subject.js fetchSubject() error: ', err);
            dispatch({ type: FETCH_SUBJECT_ERROR });
          });
      
      //If there's a queue, fetch the next item.
      } else {
        const updatedQueue = getState().subject.queue.slice();  //Make a copy of the queue
        const currentSubject = updatedQueue.shift();
        
        //Store update: enter "success" state and save fetched data.
        dispatch({
          currentSubject,
          id: currentSubject.id,
          queue: updatedQueue,
          type: FETCH_SUBJECT_SUCCESS,
          favorite: currentSubject.favorite || false
        });

        //onSuccess(), prepare for a new subject.
        dispatch(prepareForNewSubject(currentSubject));
      }
      
    }
  };
};

/*  Resets Subject to its initial values.
 */
const resetSubject = () => {
  return (dispatch) => {
    dispatch({ type: RESET_SUBJECT });
  }
};

/*  Resets all the dependencies that rely on the Subject.
 */
const prepareForNewSubject = (subject) => {
  return (dispatch) => {
    dispatch(resetAnnotations());
    dispatch(createClassification(subject));
  }
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
  return apiClient.type('collections')
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
      return apiClient.type('collections').get({
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
  resetSubject,
  fetchSubject,
  subjectError,
  toggleFavorite,
  SUBJECT_STATUS
};
