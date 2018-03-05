import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLanguage, LANGUAGES } from '../ducks/languages';

class ProjectHeader extends React.Component {
  changeLanguage(language) {
    this.props.dispatch(setLanguage(language));
    // if (document.documentElement.lang) {
    //   document.documentElement.lang = lang;
    // }
    // console.log(document.documentElement.lang);
  }

  render() {
    let className = '';

    if (this.props.location.pathname === '/classify') {
      className = 'project-header__classify';
    }

    return (
      <section className={`project-header ${className}`}>
        <div>
          <nav className="tertiary-label">
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
            <button onClick={this.changeLanguage.bind(this, LANGUAGES.ARABIC)}>ع</button>
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
  })
};

ProjectHeader.defaultProps = {
  dispatch: () => {},
  location: {}
};

export default connect()(ProjectHeader);
