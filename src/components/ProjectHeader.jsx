import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import { setLanguage, LANGUAGES } from '../ducks/languages';

class ProjectHeader extends React.Component {
  changeLanguage(language) {
    this.props.dispatch(setLanguage(language));
  }

  render() {
    return (
      <section
        className={classnames('project-header', {
          'project-header__classify': this.props.location.pathname === '/classify'
        })}
      >
        <div>
          <nav
            className={classnames('tertiary-label', {
              'project-header__rtl': this.props.rtl
            })}
          >
            <div>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                exact
                to="/"
              >
                {this.props.translate('topNav.site')}
              </NavLink>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                to="/about"
              >
                {this.props.translate('topNav.about')}
              </NavLink>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                to="/classify"
              >
                {this.props.translate('topNav.transcribe')}
              </NavLink>
              <a
                className="project-header__link"
                href="/"
              >
                {this.props.translate('topNav.talk')}
              </a>
              <a
                className="project-header__link"
                href="/"
              >
                {this.props.translate('topNav.collect')}
              </a>
            </div>
            <div>
              <button
                className={classnames({ 'active-language': this.props.language === LANGUAGES.ARABIC })}
                onClick={this.changeLanguage.bind(this, LANGUAGES.ARABIC)}
              >
                ع
              </button>
              <button
                className={classnames({ 'active-language': this.props.language === LANGUAGES.ENGLISH })}
                onClick={this.changeLanguage.bind(this, LANGUAGES.ENGLISH)}
              >
                E
              </button>
              <button
                className={classnames({ 'active-language': this.props.language === LANGUAGES.HEBREW })}
                onClick={this.changeLanguage.bind(this, LANGUAGES.HEBREW)}
              >
                ע
              </button>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

ProjectHeader.propTypes = {
  dispatch: PropTypes.func,
  language: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  rtl: PropTypes.bool,
  translate: PropTypes.func
};

ProjectHeader.defaultProps = {
  dispatch: () => {},
  language: LANGUAGES.ENGLISH,
  location: {},
  rtl: false,
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  language: state.languages.language,
  rtl: state.languages.rtl,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(ProjectHeader);
