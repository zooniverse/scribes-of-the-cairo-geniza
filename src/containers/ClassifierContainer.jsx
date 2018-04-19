import React from 'react';
import { connect } from 'react-redux';

import { fetchSubject } from '../ducks/subject';
import { fetchQueue } from '../ducks/subject';
import { loadResources } from '../ducks/translations';

import ControlPanel from '../components/ControlPanel';
import Toolbar from '../components/Toolbar';
import SubjectViewer from './SubjectViewer';

class ClassifierContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSubject());
    this.props.dispatch(fetchQueue());
    this.props.dispatch(loadResources());
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
