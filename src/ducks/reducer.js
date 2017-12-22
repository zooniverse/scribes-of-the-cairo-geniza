import { combineReducers } from 'redux';
import dialog from './dialog';
import fieldGuide from './field-guide';
import login from './login';
import project from './project';
import subject from './subject';
import subjectViewer from './subject-viewer';
import tutorial from './tutorial';
import workflow from './workflow';

export default combineReducers({
  dialog,
  fieldGuide,
  login,
  project,
  subject,
  subjectViewer,
  tutorial,
  workflow
});
