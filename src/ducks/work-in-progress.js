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

import { fetchWorkflow } from './workflow';
import { fetchSubject } from './subject';
import { loadAnnotations } from './annotations';

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
    localStorage.removeItem(`${userId}.${WORKFLOW_ID_KEY}`);
    localStorage.removeItem(`${userId}.${SUBJECT_ID_KEY}`);
    localStorage.removeItem(`${userId}.${ANNOTATIONS_KEY}`);
    
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
      //Finally, clear all saved WIP data.
      dispatch(fetchWorkflow(workflowId)).then(() => {
        return dispatch(fetchSubject(subjectId));
      }).then(() => {
        return dispatch(loadAnnotations(annotations));
      }).then(() => {
        console.log('WorkInProgress.load() success');
        return dispatch(clear());
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

export {
  WorkInProgress
};
