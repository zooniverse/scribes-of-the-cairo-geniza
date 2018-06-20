import apiClient from 'panoptes-client/lib/api-client';
import counterpart from 'counterpart';
import { config } from '../config';
import { fetchSubject } from './subject';
import { WorkInProgress } from './work-in-progress';
import { resetView } from './subject-viewer';
import { getSessionID } from '../lib/get-session-id';
import { LANGUAGES } from './languages';

const CLASSIFICATIONS_QUEUE_NAME = 'classificationsQueue';

const SUBMIT_CLASSIFICATION = 'SUBMIT_CLASSIFICATION';
const SUBMIT_CLASSIFICATION_FINISHED = 'SUBMIT_CLASSIFICATION_FINISHED';
const CREATE_CLASSIFICATION = 'CREATE_CLASSIFICATION';
const SET_SUBJECT_COMPLETION_ANSWERS = 'SET_SUBJECT_COMPLETION_ANSWERS';

const CLASSIFICATION_STATUS = {
  IDLE: 'classification_status_idle',
  SENDING: 'classification_status_sending',
  SUCCESS: 'classification_status_success',
  ERROR: 'classification_status_error'
};

const initialState = {
  classification: null,
  status: CLASSIFICATION_STATUS.status,
  subjectCompletionAnswers: {}
};

const classificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLASSIFICATION:
      return Object.assign({}, state, {
        classification: action.classification,
        status: CLASSIFICATION_STATUS.IDLE,
        subjectCompletionAnswers: {}
      });

    case SUBMIT_CLASSIFICATION:
      return Object.assign({}, state, {
        status: CLASSIFICATION_STATUS.SENDING
      });

    case SUBMIT_CLASSIFICATION_FINISHED:
      return Object.assign({}, state, {
        classification: null,
        status: CLASSIFICATION_STATUS.IDLE,
        subjectCompletionAnswers: {}
      });

    case SET_SUBJECT_COMPLETION_ANSWERS:
      const sca = Object.assign({}, state.subjectCompletionAnswers);
      sca[action.taskId] = action.answerValue;
      return Object.assign({}, state, {
        subjectCompletionAnswers: sca
      });

    default:
      return state;
  }
};

const createClassification = (subject) => {
  return (dispatch, getState) => {
    let workflow_version = '';
    if (getState().workflow.data) {
      workflow_version = getState().workflow.data.version;
    }

    const classification = apiClient.type('classifications').create({
      annotations: [],
      metadata: {
        workflow_version,
        started_at: (new Date()).toISOString(),
        user_agent: navigator.userAgent,
        user_language: counterpart.getLocale(),
        utc_offset: ((new Date()).getTimezoneOffset() * 60).toString(),
        subject_dimensions: []
      },
      links: {
        project: config.projectId,
        workflow: getState().workflow.id,
        subjects: [subject.id]
      }
    });
    classification._workflow = getState().workflow.data;
    classification._subjects = [getState().subject.currentSubject];

    dispatch({
      type: CREATE_CLASSIFICATION,
      classification
    });
  };
};

const queueClassification = (classification, user = null) => {
  const QUEUE_NAME = (user)
    ? `${user.id}.${CLASSIFICATIONS_QUEUE_NAME}`
    : `_.${CLASSIFICATIONS_QUEUE_NAME}`;

  const queue = JSON.parse(localStorage.getItem(QUEUE_NAME)) || [];
  queue.push(classification);

  try {
    localStorage.setItem(QUEUE_NAME, JSON.stringify(queue));
  } catch (err) {
    console.error('ducks/classifications.js queueClassification() error: ', err);
  }
};

const setSubjectCompletionAnswers = (taskId, answerValue) => {
  return (dispatch) => {
    dispatch({
      type: SET_SUBJECT_COMPLETION_ANSWERS,
      taskId, answerValue,
    });
  };
};

const saveAllQueuedClassifications = (dispatch, user = null) => {
  const QUEUE_NAME = (user)
    ? `${user.id}.${CLASSIFICATIONS_QUEUE_NAME}`
    : `_.${CLASSIFICATIONS_QUEUE_NAME}`;

  const queue = JSON.parse(localStorage.getItem(QUEUE_NAME));

  if (queue && queue.length !== 0) {
    const newQueue = [];
    localStorage.setItem(QUEUE_NAME, null);

    let itemsProcessed = 0;
    let itemsFailed = 0;
    const itemsToProcess = queue.length;

    const doFinally = () => {
      itemsProcessed += 1;

      if (itemsProcessed === itemsToProcess) {
        console.info(`ducks/classifications.js saveAllQueuedClassifications() finished: ${itemsProcessed} items processed, ${itemsFailed} failures`);

        if (itemsFailed > 0) {
          alert('Your Transcription could not be submitted at this time. However, we\'ve saved your work on this computer and it will automatically be resubmitted the next time you submit a Transcription. Please refresh the page to start working on a new letter.');
        }

        localStorage.setItem(QUEUE_NAME, JSON.stringify(newQueue));

        dispatch({ type: SUBMIT_CLASSIFICATION_FINISHED });
        dispatch(fetchSubject());
        dispatch(resetView());
        dispatch(WorkInProgress.clear());  //Clear the Work In Progress ONLY after all Subjects have successfully been submitted.
      }
    };

    queue.forEach((classificationData) => {
      apiClient.type('classifications').create(classificationData).save()
        .then((classificationObject) => {
          classificationObject.destroy();
          doFinally();
        })
        .catch((err) => {
          console.error('ducks/classifications.js saveAllQueuedClassifications() error: ', err);

          switch (err.status) {
            case 422:
              break;

            default:
              itemsFailed += 1;
              newQueue.push(classificationData);
          }
          doFinally();
        });
    });
  }
};

const submitClassification = () => {
  return (dispatch, getState) => {
    const subject = getState().subject;
    const subject_dimensions = (subject && subject.imageMetadata) ? subject.imageMetadata : [];
    const classification = getState().classification.classification;
    const updatedAnnotations = [];
    const user = getState().login.user;

    const manuscriptLanguage = getState().workflow.manuscriptLanguage;
    const keyboardScript = getState().keyboard.activeScript.class;
    const keyboardOpen = getState().keyboard.showKeyboard;
    const isModern = getState().keyboard.modern;

    if (!classification) {
      console.error('ducks/classifications.js submitClassification() error: no classification', '');
      alert('ERROR: Could not submit Classification.');
      return;
    }

    let task = 'T0';
    if (getState().workflow.data) {
      task = getState().workflow.data.first_task;
    }
    const firstTaskAnnotations = {
      _key: Math.random(),
      _toolIndex: 0,
      task,
      value: getState().annotations.annotations
    };
    updatedAnnotations.push(firstTaskAnnotations);

    const sca = getState().classification.subjectCompletionAnswers;
    Object.keys(sca).map((taskId) => {
      const answerForTask = {
        task: taskId,
        value: sca[taskId]
      };
      updatedAnnotations.push(answerForTask);
    });

    dispatch({ type: SUBMIT_CLASSIFICATION });

    const changes = {};
    changes.annotations = updatedAnnotations;
    changes.completed = true;
    changes['metadata.session'] = getSessionID();
    changes['metadata.finished_at'] = (new Date()).toISOString();
    changes['metadata.viewport'] = { width: innerWidth, height: innerHeight };
    changes['metadata.subject_dimensions'] = subject_dimensions || [];

    if (manuscriptLanguage === LANGUAGES.HEBREW) {
      changes['metadata.keyboard_script'] = isModern ? 'ModernKeyboard' : keyboardScript;
      changes['metadata.keyboard_open'] = keyboardOpen;
    }

    classification.update(changes);

    queueClassification(classification, user);
    saveAllQueuedClassifications(dispatch, user);
  };
};

export default classificationReducer;

export {
  createClassification,
  setSubjectCompletionAnswers,
  submitClassification
};
