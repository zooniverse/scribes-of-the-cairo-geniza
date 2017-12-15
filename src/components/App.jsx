import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ZooHeader, ZooFooter } from 'zooniverse-react-components';

import AuthContainer from '../containers/AuthContainer';
import ProjectHeader from './ProjectHeader';
import AboutLayout from './about';
import ClassifierContainer from '../containers/ClassifierContainer';
import Home from './Home';

class App extends React.Component {
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
        <div className="grommet">
          <ZooFooter />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

App.defaultProps = {
  location: {}
};

export default App;
