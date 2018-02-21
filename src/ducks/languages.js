const LANGUAGES = {
  ENGLISH: 'English',
  HEBREW: 'Hebrew',
  ARABIC: 'Arabic'
};

const initialState = {
  language: LANGUAGES.ENGLISH,
  rightToLeft: false
};

const SET_LANGUAGE = 'SET_LANGUAGE';

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        language: action.language,
        rightToLeft: action.rightToLeft
      };

    default:
      return state;
  }
};

const setLanguage = (language) => {
  return (dispatch) => {
    let rightToLeft = false;

    if (language === LANGUAGES.HEBREW || language === LANGUAGES.ARABIC) {
      rightToLeft = true;
    }

    dispatch({
      type: SET_LANGUAGE,
      language,
      rightToLeft
    });
  };
};

export default languagesReducer;

export {
  setLanguage,
  LANGUAGES
};
