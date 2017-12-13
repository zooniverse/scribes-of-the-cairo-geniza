import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ControlPanel from '../components/ControlPanel';
import Toolbar from '../components/Toolbar';

class ClassifierContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="classifier">
        <ControlPanel />
        <Toolbar />
      </main>
    );
  }
}

export default connect()(ClassifierContainer);
