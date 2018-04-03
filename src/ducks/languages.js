import {
  addTranslationForLanguage, initialize, setActiveLanguage
} from 'react-localize-redux';

import english from '../locales/en';
import arabic from '../locales/ar';
import hebrew from '../locales/he';

const LANGUAGES = {
  ENGLISH: 'English',
  HEBREW: 'Hebrew',
  ARABIC: 'Arabic'
};

const initialState = {
  language: LANGUAGES.ENGLISH,
  rtl: false
};

const SET_LANGUAGE = 'SET_LANGUAGE';

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        language: action.language,
        rtl: action.rtl
      };

    default:
      return state;
  }
};

const setLanguage = (language) => {
  return (dispatch) => {
    let rtl = false;

    if (language === LANGUAGES.HEBREW || language === LANGUAGES.ARABIC) {
      rtl = true;
    }
    let newLang = 'en';
    if (language === LANGUAGES.HEBREW) {
      newLang = 'he';
    } else if (language === LANGUAGES.ARABIC) {
      newLang = 'ar';
    }
    if (document.documentElement.lang) {
      document.documentElement.lang = newLang;
    }
    dispatch(setActiveLanguage(newLang));

    dispatch({
      type: SET_LANGUAGE,
      language,
      rtl
    });
  };
};

const initializeLanguages = () => {
  return (dispatch) => {
    const languages = ['en', 'ar', 'he'];
    dispatch(initialize(languages));
    dispatch(addTranslationForLanguage(english, 'en'));
    dispatch(addTranslationForLanguage(hebrew, 'he'));
    dispatch(addTranslationForLanguage(arabic, 'ar'));
  };
};

export default languagesReducer;

export {
  initializeLanguages,
  setLanguage,
  LANGUAGES
};
