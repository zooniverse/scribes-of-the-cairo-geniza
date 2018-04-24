/*
Save Progress
-------------

This library/duck provides mechanisms for users to save and resume their
transcription work.

Design:
For Scribes of the Cairo Geniza, we're opting to go with the Local Storage
method of saving/loading works in progress, instead of using Panoptes's built-in
"save incomplete Classification" mechanism. This is due to our experience with
Anti-Slavery Manuscripts, where network issues meant the Panoptes method - which
was intended as a safety net - became another possible point of failure.

Usage:
```
import { WorkInProgress } from './work-in-progress';

class ReduxConnectedReactComponent {
  ...
  test() {
    //Returns true/false if user has work in progress.
    //DOES NOT use Redux's dispatch().
    WorkInProgress.check(this.props.zooniverse_user);

    //Deletes any work in progress
    this.props.dispatch(WorkInProgress.clear());
    
    //Saves any work in progress
    this.props.dispatch(WorkInProgress.clear());
    
    //Loads any work in progress
    this.props.dispatch(WorkInProgress.clear());
  }
}

```

--------------------------------------------------------------------------------
 */

import PropTypes from 'prop-types';

import { fetchWorkflow } from './workflow';
import { fetchSubject } from './subject';
import { loadAnnotations } from './annotations';

/*
--------------------------------------------------------------------------------
 */

// Constants and Action Types
// --------------------------

const SET_TIMESTAMP = 'work-in-progress/SET_TIMESTAMP';
const CLEAR_TIMESTAMP = 'work-in-progress/CLEAR_TIMESTAMP';

const WORKFLOW_ID_KEY = 'workInProgress_workflowId';
const SUBJECT_ID_KEY = 'workInProgress_subjectId';
const ANNOTATIONS_KEY = 'workInProgress_annotations';
const ANONYMOUS_USER_ID = 'anonymous';

//See ./reducer.js for the store name.
const REDUX_STORE_NAME = 'workInProgress';

/*
--------------------------------------------------------------------------------
 */

// React-Redux Helper Objects
// --------------------------

/*  WORKINPROGRESS_INITIAL_STATE defines the default/starting values of the
    Redux store. To use this in your Redux-connected React components, try...

    Usage:
      MyReactComponent.defaultProps = {
        ...WORKINPROGRESS_INITIAL_STATE,
        otherProp: 'default value'
      };
 */
const WORKINPROGRESS_INITIAL_STATE = {
  wipTimestamp: null,  //'Date' object indicating the last time a save was made.
                       //null if there's no save.
};

/*  WORKINPROGRESS_PROPTYPES is used to define the property types of the data,
    and only matters to Redux-connected React components.

    Usage:
      MyReactComponent.propTypes = {
        ...WORKINPROGRESS_PROPTYPES,
        otherProp: PropTypes.string,
      };
 */
const WORKINPROGRESS_PROPTYPES = {
  wipTimestamp: PropTypes.object,
};

/*  Used as a convenience feature in mapStateToProps() functions in
    Redux-connected React components.

    Usage:
      mapStateToProps = (state) => {
        return {
          ...getWorkInProgressStateValues(state),
          someOtherValue: state.someOtherStore.someOtherValue
        }
      }
 */
const getWorkInProgressStateValues = (state) => {
  return {
    wipTimestamp: state[REDUX_STORE_NAME].wipTimestamp,
  };
};

/*
--------------------------------------------------------------------------------
 */

// Redux Reducer
// -------------

const wipReducer = (state = WORKINPROGRESS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TIMESTAMP:
      return Object.assign({}, state, {
        wipTimestamp: action.timestamp,
      });
    
    case CLEAR_TIMESTAMP:
      return Object.assign({}, state, {
        wipTimestamp: null,
      });

    default:
      return state;
  };
};

/*
--------------------------------------------------------------------------------
 */

// Action Creators
// ---------------

/*  Checks if the user has any work in progress saved.
    Doesn't use Redux's dispatch() since this is a simple synchronous check.
    I'm sorry for not following the pattern for the rest of the functions.
 */
const check = (user) => {
  const userId = (user) ? user.id : ANONYMOUS_USER_ID;
  const workflowId = localStorage.getItem(`${userId}.${WORKFLOW_ID_KEY}`);
  const subjectId = localStorage.getItem(`${userId}.${SUBJECT_ID_KEY}`);
  const annotations = localStorage.getItem(`${userId}.${ANNOTATIONS_KEY}`);

  return !!workflowId && !!subjectId && !!annotations;
}

/*  Clears any work in progress the user has.
    Needs to be called via Redux's dispatch().
 */
const clear = () => {
  return (dispatch, getState) => {
    const userId = (getState().login.user) ? getState().login.user.id : ANONYMOUS_USER_ID;
    localStorage.removeItem(`${userId}.${WORKFLOW_ID_KEY}`);
    localStorage.removeItem(`${userId}.${SUBJECT_ID_KEY}`);
    localStorage.removeItem(`${userId}.${ANNOTATIONS_KEY}`);
    
    //Store update
    dispatch({ type: CLEAR_TIMESTAMP });
    console.log('WorkInProgress.clear()');
  }
};

/*  Saves any work in progress the user has.
    Needs to be called via Redux's dispatch().
 */
const save = () => {
  return (dispatch, getState) => {
    const userId = (getState().login.user) ? getState().login.user.id : ANONYMOUS_USER_ID;
    const workflowId = getState().workflow.id;
    const subjectId = getState().subject.id;
    const annotations = getState().annotations.annotations;
    
    //Sanity check: make sure we have something to load.
    if (!workflowId || !subjectId || !annotations) {
      console.error('WorkInProgress.save() error: nothing to save.');
      return;
    }

    localStorage.setItem(`${userId}.${WORKFLOW_ID_KEY}`, workflowId);
    localStorage.setItem(`${userId}.${SUBJECT_ID_KEY}`, subjectId);
    localStorage.setItem(`${userId}.${ANNOTATIONS_KEY}`, JSON.stringify(annotations));
    
    //Store update
    dispatch({ type: SET_TIMESTAMP, timestamp: new Date(Date.now()) });
    console.log('WorkInProgress.save() success');
  };
};

/*  Loads any work in progress the user has and TRIGGERS the necessary
    Workflow-Subject-Classification lifecycle updates.
    Needs to be called via Redux's dispatch().
 */
const load = () => {
  return (dispatch, getState) => {
    try {
      const userId = (getState().login.user) ? getState().login.user.id : ANONYMOUS_USER_ID;
      const workflowId = localStorage.getItem(`${userId}.${WORKFLOW_ID_KEY}`);
      const subjectId = localStorage.getItem(`${userId}.${SUBJECT_ID_KEY}`);  //TODO: Check if a type conversion is required.
      const annotations = JSON.parse(localStorage.getItem(`${userId}.${ANNOTATIONS_KEY}`));
      
      //Sanity check: make sure we have something to load.
      if (!workflowId || !subjectId || !annotations) {
        console.error('WorkInProgress.save() error: nothing to load.');
        return;
      }
      
      //First, load the Workflow, then the Subject, then the Annotations.
      dispatch(fetchWorkflow(workflowId)).then(() => {
        return dispatch(fetchSubject(subjectId));
      }).then(() => {
        return dispatch(loadAnnotations(annotations));
      }).then(() => {
        console.log('WorkInProgress.load() success');
        
        //If we want to remove all saved progress when a user successfully
        //loads their data, enable this following line:
        //  return dispatch(clear());
        
        return null;
      });
    } catch (err) {
      console.error('WorkInProgress.load() error: ', err);
    }
  };
};

/*
--------------------------------------------------------------------------------
 */

// Function Library
// ----------------

/*  Actions are packaged into a single "library object" for ease of importing
    between components.
 */
const WorkInProgress = {
  check,
  save,
  load,
  clear,  
};

/*
--------------------------------------------------------------------------------
 */

// Exports
// -------

export default wipReducer;

export {
  WorkInProgress,
  WORKINPROGRESS_INITIAL_STATE,
  WORKINPROGRESS_PROPTYPES,
  getWorkInProgressStateValues,
};
