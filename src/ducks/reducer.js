import { combineReducers } from 'redux';
import dialog from './dialog';
import fieldGuide from './field-guide';
import initialize from './initialize';
import login from './login';
import project from './project';
import subject from './subject';
import subjectViewer from './subject-viewer';
import workflow from './workflow';

export default combineReducers({
  dialog,
  fieldGuide,
  initialize,
  login,
  project,
  subject,
  subjectViewer,
  workflow
});
