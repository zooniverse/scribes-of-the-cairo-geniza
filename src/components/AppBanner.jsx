import React from 'react';
import { connect } from 'react-redux';
import { getActiveLanguage } from 'react-localize-redux';
import PropTypes from 'prop-types';

const AppBanner = ({ currentLanguage }) => {
  switch (currentLanguage) {
    case 'he': return (
      <div className="app-banner">
        התמלול על פרויקט זה הושלם כעת. תודה על כל העזרה שלך! אנא עיין ב-<a href="https://www.zooniverse.org/about/publications">Zooniverse Publications Page</a> לתוצאות.
      </div>
    );
    case 'ar': return (
      <div className="app-banner">
        اكتمل النسخ في هذا المشروع حاليًا. شكرا لكم على كل ما تبذلونه من مساعدة! يرجى الاطلاع على <a href="https://www.zooniverse.org/about/publications">Zooniverse Publications Page</a> للحصول على النتائج.
      </div>
    );
    default: return (
      <div className="app-banner">
        Transcription on this project is currently complete. Thank you for all your help! Please see the <a href="https://www.zooniverse.org/about/publications">Zooniverse Publications Page</a> for results.
      </div>
    );
  }
};

AppBanner.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

AppBanner.defaultProps = {};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code
});

export default connect(mapStateToProps)(AppBanner);
