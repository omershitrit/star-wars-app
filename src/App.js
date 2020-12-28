import React from 'react';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }

  //shouldComponentUpdate = () => this.state.people.length === 0

  /*
  An async anonymous function that waits for all the queries before calling to setState.
  */
  getData = () => {
    (async () => {
      const starwarsPeople = await this.getAllStarwarsPeople();
      this.setState({ people: starwarsPeople });
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

  g = () => { }

  componentDidMount = () => {
    this.getData();
  }

  showPeople = () => {
    return this.state.people.map((e, index) => (<div key={index}>{e.name}</div>))
  }

  render() {
    return (
      <div>
        {this.showPeople()}
        {this.state.people.length}
      </div>
    );
  }

}
