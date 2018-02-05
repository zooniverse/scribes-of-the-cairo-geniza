import apiClient from 'panoptes-client/lib/api-client';
import counterpart from 'counterpart';
import { config } from '../config';

const SUBMIT_CLASSIFICATION = 'SUBMIT_CLASSIFICATION';
const SUBMIT_CLASSIFICATION_FINISHED = 'SUBMIT_CLASSIFICATION_FINISHED';
const CREATE_CLASSIFICATION = 'CREATE_CLASSIFICATION';

const CLASSIFICATION_STATUS = {
  IDLE: 'classification_status_idle',
  SENDING: 'classification_status_sending',
  SUCCESS: 'classification_status_success',
  ERROR: 'classification_status_error'
};

const initialState = {
  classification: null,
  status: CLASSIFICATION_STATUS.status
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

export default classificationReducer;

export {
  createClassification
};
