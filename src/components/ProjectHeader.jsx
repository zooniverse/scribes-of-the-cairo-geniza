import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLanguage, LANGUAGES } from '../ducks/languages';

class ProjectHeader extends React.Component {
  changeLanguage(language) {
    this.props.dispatch(setLanguage(language));
  }

  render() {
    return (
      <section className={classnames('project-header', {
        'project-header__classify': this.props.location.pathname === '/classify'
      })}
      >
        <div>
          <nav className="tertiary-label">
            <div className={classnames({ 'project-header__rtl': this.props.rtl })}>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                exact
                to="/"
              >
                Scribes of the Cairo Geniza
              </NavLink>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                activeClassName="project-header__active"
                className="project-header__link"
                to="/classify"
              >
                Transcribe
              </NavLink>
              <a
                className="project-header__link"
                href="/"
              >
                Talk
              </a>
              <a
                className="project-header__link"
                href="/"
              >
                Collect
              </a>
            </div>
            <button>ع</button>
            <button onClick={this.changeLanguage.bind(this, LANGUAGES.ENGLISH)}>E</button>
            <button onClick={this.changeLanguage.bind(this, LANGUAGES.HEBREW)}>ע</button>
          </nav>
        </div>
      </section>
    );
  }
}

ProjectHeader.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  rtl: PropTypes.bool
};

ProjectHeader.defaultProps = {
  dispatch: () => {},
  location: {},
  rtl: false
};

const mapStateToProps = (state) => ({
  rtl: state.languages.rtl
});

export default connect(mapStateToProps)(ProjectHeader);
