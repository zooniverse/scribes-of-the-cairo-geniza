import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import WorkflowDropdown from './WorkflowDropdown';

import { setLanguage, LANGUAGES } from '../ducks/languages';
import { toggleSelection } from '../ducks/workflow';

class ProjectHeader extends React.Component {
  constructor() {
    super();

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentWillReceiveProps(next) {
    if (this.props.location.pathname !== next.location.pathname && this.props.showWorkflows) {
      this.toggleDropdown(false);
    }
  }

  changeLanguage(language) {
    this.props.dispatch(setLanguage(language));
  }

  toggleDropdown(e, nextState = !this.props.showWorkflows) {
    this.props.dispatch(toggleSelection(nextState));
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
              <button
                className="project-header__link"
                onClick={this.toggleDropdown}
              >
                {this.props.translate('topNav.transcribe')}
              </button>
              {this.props.showWorkflows && (
                <WorkflowDropdown />
              )}
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
            <div className="project-header__buttons">
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
  showWorkflows: PropTypes.bool,
  translate: PropTypes.func
};

ProjectHeader.defaultProps = {
  dispatch: () => {},
  language: LANGUAGES.ENGLISH,
  location: {},
  rtl: false,
  showWorkflows: false,
  translate: () => {}
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  language: state.languages.language,
  rtl: state.languages.rtl,
  showWorkflows: state.workflow.showSelection,
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(ProjectHeader);
