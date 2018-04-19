import React from 'react';
import { connect } from 'react-redux';

import {
  fetchSubject, SUBJECT_STATUS,
} from '../ducks/subject';

import ControlPanel from '../components/ControlPanel';
import Toolbar from '../components/Toolbar';
import SubjectViewer from './SubjectViewer';

class ClassifierContainer extends React.Component {
  componentWillMount() {
    //TODO: check if a Workflow has been selected. Prompt the user to select
    //one if there's none.
  
    //Initial Subject fetch!
    //If we didn't check that a Subject already exists, we'd always fetch
    //a new subject every time the user accesses the Classifier. 
    if (this.props.subjectStatus === SUBJECT_STATUS.IDLE) {
      this.props.dispatch(fetchSubject());
    }
  }

  render() {
    return (
      <main className="classifier">
        <ControlPanel />
        <SubjectViewer />
        <Toolbar />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSubject: state.subject.currentSubject,
    subjectStatus: state.subject.status,
  };
};

export default connect(mapStateToProps)(ClassifierContainer);
