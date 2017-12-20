import { combineReducers } from 'redux';
import login from './login';
import project from './project';
import subject from './subject';
import subjectViewer from './subject-viewer';
import workflow from './workflow';

export default combineReducers({
  login,
  project,
  subject,
  subjectViewer,
  workflow
});
