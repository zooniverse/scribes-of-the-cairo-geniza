import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Connect from './Connect';

class HomeStatistics extends React.Component {
  render() {
    const project = this.props.project;
    if (!project) return null;

    return (
      <div className="statistics">
        <div className="statistics__stat-content">
          <div className="statistics__pie-chart">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="100" fill="#EBDFD6" stroke="#472B36" strokeWidth="5px" />
              <path d="M100 100 L 100,0 A100,100 0 0,1 200,100 z" fill="#472B36" />
            </svg>
            <span>Percent Complete</span>
            <hr className="plum-line" />
          </div>
          <div className="statistics__statistics">
            <h2>Statistics from phase two of Scribes of the Cairo Geniza</h2>
            <div className="statistics__stat">
              <div>
                <span>{project.classifiers_count.toLocaleString() || 0}</span>
                <span>Volunteers</span>
                <hr className="plum-line" />
              </div>
              <div>
                <span>{project.classifications_count.toLocaleString() || 0}</span>
                <span>Classifications</span>
                <hr className="plum-line" />
              </div>
              <div>
                <span>{project.retired_subjects_count.toLocaleString() || 0}</span>
                <span>Completed Subjects</span>
                <hr className="plum-line" />
              </div>
            </div>
            <a href="/" className="text-links">More statistics</a>
            <a href="/" className="text-links">Phase One statistics</a>
          </div>
        </div>
        <Connect />
      </div>
    );
  }
}

HomeStatistics.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string
  })
};

HomeStatistics.defaultProps = {
  project: null
};

const mapStateToProps = state => ({
  project: state.project.data
});

export default connect(mapStateToProps)(HomeStatistics);
