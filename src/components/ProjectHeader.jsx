import React from 'react';
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
          <ul className="tertiary-label">
            <li>Home</li>
            <li>About</li>
            <li>Classify</li>
            <li>Talk</li>
            <li>Collect</li>
            <li>Language<i className="fa fa-chevron-down" /></li>
          </ul>
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
