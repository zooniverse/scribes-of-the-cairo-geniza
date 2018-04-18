import apiClient from 'panoptes-client/lib/api-client';

// Actions
const TRANSLATION_ERROR = 'TRANSLATION_ERROR';
const FETCH_TRANSLATIONS = 'FETCH_TRANSLATIONS';
const SET_STRINGS = 'SET_STRINGS';

const TRANSLATION_STATUS = {
  IDLE: 'translation_status_idle',
  FETCHING: 'translation_status_fetching',
  READY: 'translation_status_ready',
  ERROR: 'translation_status_error'
};

const initialState = {
  status: TRANSLATION_STATUS.IDLE,
  strings: {
    field_guide: {},
    tutorial: {}
  }
};

const translationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STRINGS:
      const strings = Object.assign({}, state.strings, action.payload);
      return Object.assign({}, state, { strings });

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

const loadTranslations = (translated_type, translated_id) => {
  return (dispatch, getState) => {
    const languages = ['ar', 'he', 'en'];
    dispatch({
      type: FETCH_TRANSLATIONS,
      translated_type,
      translated_id
    });
    languages.map((language) => {
      apiClient.type('translations')
        .get({ translated_type, translated_id, language })
        .then(([translations]) => {
          if (translations) {
            const resource = getState().translations.strings[translated_type];
            resource[language] = translations.strings;
            dispatch({
              type: SET_STRINGS,
              payload: {
                [translated_type]: resource
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
    });
  };
};

export default translationsReducer;

export { loadTranslations };
