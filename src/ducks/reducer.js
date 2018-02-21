import { combineReducers } from 'redux';
import dialog from './dialog';
import fieldGuide from './field-guide';
import initialize from './initialize';
import login from './login';
import project from './project';
import subject from './subject';
import subjectViewer from './subject-viewer';
import tutorial from './tutorial';
import workflow from './workflow';
import classification from './classification';
import annotations from './annotations';
import collections from './collections';
import aggregations from './aggregations';

export default combineReducers({
  annotations,
  aggregations,
  classification,
  collections,
  dialog,
  fieldGuide,
  initialize,
  login,
  project,
  subject,
  subjectViewer,
  tutorial,
  workflow
});
