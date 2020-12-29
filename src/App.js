import React from 'react';
import Home from './components/home.js';
import Person from './components/person.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
  }

  //shouldComponentUpdate = () => this.state.people.length === 0

  /*
  An async anonymous function that waits for all the queries before calling to setState.
  */

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
