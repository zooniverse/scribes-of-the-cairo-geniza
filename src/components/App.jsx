import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AuthContainer from '../containers/AuthContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="site-header">
          <h1 className="title">Zooniverse Starter Project</h1>
          <Link to="/about" className="link">About</Link>
          <AuthContainer />
        </header>
        <section className="content-section">
          {this.props.children || 'Welcome to Zooniverse Starter Project'}
        </section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
