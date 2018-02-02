import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ZooHeader, ZooFooter } from 'zooniverse-react-components';
import { fetchResources } from '../ducks/initialize';

import AboutLayout from './about';
import AuthContainer from '../containers/AuthContainer';
import ClassifierContainer from '../containers/ClassifierContainer';
import Dialog from './Dialog';
import Home from './Home';
import ProjectHeader from './ProjectHeader';

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchResources());
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
  initializerReady: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

App.defaultProps = {
  dialog: null,
  initializerReady: false,
  location: {}
};

const mapStateToProps = (state) => ({
  dialog: state.dialog.data,
  initializerReady: state.initialize.ready
});

export default connect(mapStateToProps)(App);
