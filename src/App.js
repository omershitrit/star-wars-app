import React from 'react';
import './App.css';
import axios from 'axios';
import logo from './photos/logo.png';
import Item from './components/item.js';
import GreenSword from './photos/green_sword.png';
import BlueSword from './photos/blue_sword.png';
import PurpleSword from './photos/purple_sword.png';
import redSword from './photos/red_sword.png';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      filteredPeople: []
    };
  }

  //shouldComponentUpdate = () => this.state.people.length === 0

  /*
  An async anonymous function that waits for all the queries before calling to setState.
  */
  getData = () => {
    (async () => {
      const starwarsPeople = await this.getAllStarwarsPeople();
      this.setState({
        people: starwarsPeople,
        filteredPeople: starwarsPeople
      });
    })();
  }

  getAllStarwarsPeople = () => {
    let people = [];
    // get the first page
    return axios("https://swapi.dev/api/people/")
      .then(response => {
        // get the people from the first page
        people = response.data.results;
        return response.data.count;
      })
      .then(count => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        // get promises for all the pages
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then(response => {
        // get the people from pages 2 to n
        people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
        return people;
      })
      .catch(error => console.log("SOMETHING WENT WRONG"));
  }

  componentDidMount = () => {
    this.getData();
  }

  calculateImage = (index) => {
    const r = index % 4;
    if (r === 0) { return GreenSword; }
    if (r === 1) { return PurpleSword; }
    if (r === 2) { return BlueSword; }
    if (r === 3) { return redSword; }
  }

  showPeople = () => {
    return this.state.filteredPeople.map((e, index) => (
      <Item key={index} className="item" name={e.name} image={this.calculateImage(index)}>{e.name}</Item>)
    )
  }

  handleChange = (e) => {
    const value = e.target.value;
    const newFilteredPeople = this.state.people.filter((element) => element.name.startsWith(value));
    this.setState({ filteredPeople: newFilteredPeople });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <img className="logo" src={logo} />
          <TextField
            className="field"
            placeholder="Search"
            variant="outlined"
            color="secondary"
            onChange={this.handleChange}
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <div className="people">
            {this.showPeople()}
          </div>
        </div >
      </Router>
    );
  }

}
