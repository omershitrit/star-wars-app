import React from 'react';
import Home from './components/home.js';
import Person from './components/person.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/star-wars-app" exact component={Home} />
          <Route path="/star-wars-app/Person" component={Person} />
        </Switch>
      </Router>
    );
  }

}
