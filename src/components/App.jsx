import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ZooHeader, ZooFooter } from 'zooniverse-react-components';

import { fetchProject } from '../ducks/project';
import { fetchWorkflow } from '../ducks/workflow';

import AboutLayout from './about';
import AuthContainer from '../containers/AuthContainer';
import ClassifierContainer from '../containers/ClassifierContainer';
import Dialog from './Dialog';
import Home from './Home';
import ProjectHeader from './ProjectHeader';

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchProject());
    this.props.dispatch(fetchWorkflow());
  }

  render() {
    return (
      <div>
        <header className="app-header">
          <ZooHeader authContainer={<AuthContainer />} />
        </header>
        <section className="content-section">
          <ProjectHeader location={this.props.location} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutLayout} />
            <Route path="/classify" component={ClassifierContainer} />
          </Switch>
        </section>

        {(this.props.dialog === null) ? null :
          <Dialog>
            {this.props.dialog}
          </Dialog>
        }

        <div className="grommet">
          <ZooFooter />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dialog: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

App.defaultProps = {
  dialog: null,
  location: {}
};

const mapStateToProps = (state) => ({
  dialog: state.dialog.data
});

export default connect(mapStateToProps)(App);
