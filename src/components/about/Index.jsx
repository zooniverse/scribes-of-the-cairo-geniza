import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import About from './About'
import NestedComponent from './NestedComponent';

export default function AboutLayout({ match }) {
  return (
    <div>
      <h2>About</h2>
      <nav>
        <ul>
          <li><Link to="/about" >About home</Link></li>
          <li><Link to="/about/nested">A nested page</Link></li>
        </ul>
      </nav>
      <section>
        <Switch>
          <Route exact path={`${match.url}/`} component={About} />
          <Route path={`${match.url}/nested`} component={NestedComponent} />
        </Switch>
      </section>
    </div>
  );
}
