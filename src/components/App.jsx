import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ZooHeader, ZooFooter } from 'zooniverse-react-components';

import { fetchResources } from '../ducks/initialize';
import { generateSessionID } from '../lib/get-session-id';
import AboutLayout from './about';
import AuthContainer from '../containers/AuthContainer';
import ClassifierContainer from '../containers/ClassifierContainer';
import Home from './Home';
import ProjectHeader from '../containers/ProjectHeader';

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchResources());
  }

  componentDidMount() {
    generateSessionID();
  }

  render() {
    if (!this.props.initializerReady) return null;

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

        {this.props.popup}

        <div className="grommet">
          <ZooFooter />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initializerReady: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  popup: PropTypes.node
};

App.defaultProps = {
  initializerReady: false,
  location: {},
  popup: null
};

const mapStateToProps = state => ({
  initializerReady: state.initialize.ready,
  popup: state.dialog.popup
});

export default connect(mapStateToProps)(App);
