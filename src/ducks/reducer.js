import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';

import aggregations from './aggregations';
import annotations from './annotations';
import classification from './classification';
import collections from './collections';
import cribSheet from './crib-sheet';
import dialog from './dialog';
import fieldGuide from './field-guide';
import initialize from './initialize';
import keyboard from './keyboard';
import languages from './languages';
import login from './login';
import project from './project';
import reminder from './reminder';
import subject from './subject';
import subjectViewer from './subject-viewer';
import translations from './translations';
import tutorial from './tutorial';
import workflow from './workflow';
import workInProgress from './work-in-progress';

export default combineReducers({
  aggregations,
  annotations,
  classification,
  collections,
  cribSheet,
  dialog,
  fieldGuide,
  initialize,
  locale,
  keyboard,
  languages,
  login,
  project,
  reminder,
  subject,
  subjectViewer,
  translations,
  tutorial,
  workflow,
  workInProgress
});
