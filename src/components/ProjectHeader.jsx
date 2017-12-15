import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProjectHeader extends React.Component {
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
            <button>ع</button>
            <button>E</button>
            <button>ע</button>
          </nav>
        </div>
      </section>
    );
  }
}

ProjectHeader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

ProjectHeader.defaultProps = {
  location: {}
};

export default ProjectHeader;
