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

    dispatch({
      type: SET_LANGUAGE,
      language,
      rtl
    });
  };
};

export default languagesReducer;

export {
  setLanguage,
  LANGUAGES
};
