import React from 'react';
import { connect } from 'react-redux';

import { fetchQueue } from '../ducks/subject';

import ControlPanel from '../components/ControlPanel';
import Toolbar from '../components/Toolbar';
import SubjectViewer from './SubjectViewer';

class ClassifierContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchQueue());
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

export default connect()(ClassifierContainer);