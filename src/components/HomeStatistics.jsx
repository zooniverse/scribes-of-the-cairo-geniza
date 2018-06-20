import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPhaseTwoWorkflows } from '../ducks/workflow';
import { config } from '../config';
import Connect from './Connect';

class HomeStatistics extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPhaseTwoWorkflows());
  }

  getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return { x, y };
  }

  render() {
    const { project, allWorkflows } = this.props;
    if (!project || !allWorkflows) return null;
    let classificationsCount = 0;
    let percentComplete = 0;
    let retiredSubjects = 0;
    let subjectsCount = 0;

    Object.keys(allWorkflows).map((id) => {
      const workflow = allWorkflows[id];
      if (workflow) {
        classificationsCount += workflow.classifications_count;
        retiredSubjects += workflow.retired_set_member_subjects_count;
        subjectsCount += workflow.subjects_count;
      }
    });

    if (retiredSubjects && subjectsCount) {
      percentComplete = (retiredSubjects / subjectsCount);
    }
    const pieChartCoor = this.getCoordinatesForPercent(percentComplete);
    const arcSize = percentComplete > 0.5 ? 1 : 0;

    return (
      <div className="statistics">
        <div className="statistics__stat-content">
          <div className="statistics__pie-chart">
            <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="0" cy="0" r="1" fill="#EBDFD6" stroke="#472B36" strokeWidth="0.05" />
              <path d={`M 1 0 A 1 1 0 ${arcSize} 1 ${pieChartCoor.x} ${pieChartCoor.y} L 0 0`} fill="#472B36" />
            </svg>
            <span>{Math.floor(percentComplete * 100)}% Complete</span>
            <hr className="plum-line" />
          </div>
          <div className="statistics__statistics">
            <h2>Statistics from transcription of Scribes of the Cairo Geniza</h2>
            <div className="statistics__stat">
              <div>
                <span>{project.classifiers_count.toLocaleString() || 0}</span>
                <span>Volunteers</span>
                <hr className="plum-line" />
              </div>
              <div>
                <span>{classificationsCount.toLocaleString() || 0}</span>
                <span>Classifications</span>
                <hr className="plum-line" />
              </div>
              <div>
                <span>{retiredSubjects.toLocaleString() || 0}</span>
                <span>Completed Subjects</span>
                <hr className="plum-line" />
              </div>
            </div>
            <a
              className="text-links"
              href={`${config.host}projects/${config.projectSlug}/stats`}
              target="_blank"
              rel="noopener noreferrer"
            >
              More statistics
            </a>
          </div>
        </div>
        <Connect />
      </div>
    );
  }
}

HomeStatistics.propTypes = {
  allWorkflows: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string
  })
};

HomeStatistics.defaultProps = {
  allWorkflows: {},
  project: null
};

const mapStateToProps = state => ({
  allWorkflows: state.workflow.allWorkflows,
  project: state.project.data
});

export default connect(mapStateToProps)(HomeStatistics);
