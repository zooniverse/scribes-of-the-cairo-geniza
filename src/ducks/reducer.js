import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
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
import cribSheet from './crib-sheet';
import languages from './languages';
import keyboard from './keyboard';
import translations from './translations';

export default combineReducers({
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
  subject,
  subjectViewer,
  translations,
  tutorial,
  workflow
});
