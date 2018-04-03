import apiClient from 'panoptes-client/lib/api-client';
import counterpart from 'counterpart';

const DEFAULT_LOCALE = counterpart.getLocale();

counterpart.setFallbackLocale(DEFAULT_LOCALE);
// Actions
const TRANSLATION_ERROR = 'TRANSLATION_ERROR';
const FETCH_TRANSLATIONS = 'FETCH_TRANSLATIONS';
const SET_LOCALE = 'SET_LOCALE';
const SET_STRINGS = 'SET_STRINGS';

const TRANSLATION_STATUS = {
  IDLE: 'translation_status_idle',
  FETCHING: 'translation_status_fetching',
  READY: 'translation_status_ready',
  ERROR: 'translation_status_error'
};

const initialState = {
  locale: DEFAULT_LOCALE,
  status: TRANSLATION_STATUS.IDLE,
  strings: {
    project: {},
    workflow: {},
    tutorial: {},
    field_guide: {},
    project_page: []
  }
};

const translationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return Object.assign({}, state, {
        locale: action.payload
      });

    case SET_STRINGS:
      const strings = Object.assign({}, state.strings, action.payload);
      return Object.assign({}, state, {
        strings
      });

    case TRANSLATION_ERROR:
      return Object.assign({}, state, {
        status: TRANSLATION_STATUS.ERROR
      });

    case FETCH_TRANSLATIONS:
      return Object.assign({}, state, {
        status: TRANSLATION_STATUS.FETCHING
      });

    default:
      return state;
  }
};

const loadResources = (resource_type, translated_id, language) => {
  counterpart.setLocale(language);
  const translated_type = resource_type === 'minicourse' ? 'tutorial' : resource_type;
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSLATIONS, payload: { translated_type, translated_id, language } });
    apiClient
      .type('translations')
      .get({ translated_type, translated_id, language })
      .then(([translation]) => {
        if (translation && translation.strings) {
          dispatch({
            type: SET_STRINGS,
            payload: {
              [resource_type]: translation.strings
            }
          });
        } else {
          dispatch({
            type: SET_STRINGS,
            payload: {
              [resource_type]: {}
            }
          });
        }
      })
      .catch(error => {
        console.warn(
          translated_type,
          translated_id,
          `(${language})`,
          error.status,
          'translation fetch error:',
          error.message
        );
        dispatch({ type: TRANSLATION_ERROR, payload: error });
      });
  };
};

const loadTranslations = (translated_type, translated_id, language) => {
  counterpart.setLocale(language);
  return (dispatch) => {
    dispatch({
      type: FETCH_TRANSLATIONS,
      translated_type,
      translated_id,
      language
    });
    apiClient
      .type('translations')
      .get({ translated_type, translated_id, language })
      .then((translations) => {
        if (translations) {
          dispatch({
            type: SET_STRINGS,
            payload: {
              [translated_type]: translations
            }
          });
        }
      })
      .catch(error => {
        console.warn(
          translated_type,
          translated_id,
          `(${language})`,
          error.status,
          'translation fetch error:',
          error.message
        );
        dispatch({ type: TRANSLATION_ERROR, payload: error });
      });
  };
};

const setLocale = (locale) => {
  counterpart.setLocale(locale);
  return (dispatch) => {
    dispatch({
      type: SET_LOCALE,
      payload: locale
    });
  };
};

export default translationsReducer;

export {
  loadResources,
  loadTranslations,
  setLocale
};
