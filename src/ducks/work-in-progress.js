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

//import { fetchSavedSubject, prepareForNewSubject, setSubjectId } from './subject';
//import { setAnnotations } from './annotations';

/*
--------------------------------------------------------------------------------
 */

// Constants and Action Types
// --------------------------

const WORKFLOW_ID_KEY = 'workInProgress_workflowId';
const SUBJECT_ID_KEY = 'workInProgress_subjectId';
const ANNOTATIONS_KEY = 'workInProgress_annotations';
const ANONYMOUS_USER_ID = 'anonymous';

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
    localStorage.removeItem(`${userId}.${SUBJECT_ID_KEY}`);
    localStorage.removeItem(`${userId}.${ANNOTATIONS_KEY}`);
  }
};

/*  Saves any work in progress the user has.
    Needs to be called via Redux's dispatch().
 */
const save = () => {
  return (dispatch, getState) => {
    const workflowId = getState().workflow.id;
    const subjectId = getState().subject.id;
    const annotations = getState().annotations.annotations;

    if (subjectId !== null) {      
      const userId = (getState().login.user) ? getState().login.user.id : ANONYMOUS_USER_ID;
      localStorage.setItem(`${userId}.${WORKFLOW_ID_KEY}`, workflowId);
      localStorage.setItem(`${userId}.${SUBJECT_ID_KEY}`, subjectId);
      localStorage.setItem(`${userId}.${ANNOTATIONS_KEY}`, JSON.stringify(annotations));
    }
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
      
      //dispatch(fetchSavedSubject(subjectId));
      //dispatch(fetchSavedSubject(subjectId));
      //dispatch(setSubjectId(subjectId));  //Required so that when prepareForNewSubject creates a Classification, subject ID isn't null. (fetchSavedSubject, above, is async, you see.)
      //prepareForNewSubject(dispatch, null);
      //dispatch(setAnnotations(annotations));  //Note: be sure to set Annotations AFTER prepareForNewSubject().
    } catch (err) {
      //TODO
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

export {
  WorkInProgress
};
