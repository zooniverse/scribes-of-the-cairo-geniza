import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ZooHeader, ZooFooter } from 'zooniverse-react-components';

import AuthContainer from '../containers/AuthContainer';
import ProjectHeader from './ProjectHeader';
import AboutLayout from './about';
import Home from './Home';

export default function App() {
  return (
    <div>
      <header className="app-header">
        <ZooHeader authContainer={<AuthContainer />} />
      </header>
      <section className="content-section">
        <ProjectHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutLayout} />
        </Switch>
      </section>
      <div className="grommet">
        <ZooFooter />
      </div>
    </div>
  );
}
