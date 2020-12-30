import React from 'react';
import './home.css';
import logo from '../photos/logo.png';
import axios from 'axios';
import Item from './item.js';
import GreenSword from '../photos/green_sword.png';
import BlueSword from '../photos/blue_sword.png';
import PurpleSword from '../photos/purple_sword.png';
import redSword from '../photos/red_sword.png';
import TextField from '@material-ui/core/TextField';

// amount of people that apears in a single page - editable here:
const PER_PAGE = 6;

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            filteredPeople: [],
            propsToPerson: {},
            page: 0,
            showButtons: true
        };
    }

    // gets the star wars people and updates the state acoordingly
    getData = () => {
        (async () => {
            const starwarsPeople = await this.getAllStarwarsPeople();
            const flag = starwarsPeople.length > PER_PAGE;
            this.setState({ people: starwarsPeople, filteredPeople: starwarsPeople, showButtons: flag });
        })();
    }

    // receives all the people from all the pages and put them together in a unified array
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

    // get the data when rendering is done
    componentDidMount = () => this.getData();

    // filters immediately upon writing
    handleChange = e => {
        // value holds the search word
        const value = e.target.value;
        // filter search results regardless it is uppercase or lowercase
        const newFilteredPeople = this.state.people.filter(el => el.name.toLowerCase().startsWith(value.toLowerCase()))
        const flag = newFilteredPeople.length > PER_PAGE;
        this.setState({ filteredPeople: newFilteredPeople, showButtons: flag, page: 0 });
    }

    // made to vary the sword images; gives an image acoording to the index
    getImage = index => {
        if (index % 4 === 0) { return GreenSword; }
        if (index % 4 === 1) { return PurpleSword; }
        if (index % 4 === 2) { return BlueSword; }
        return redSword;
    }

    // calculates and returns the current page
    showPeople = () => {
        let arr = this.state.filteredPeople.map((e, index) => (
            <Item key={index} className="item" data={e} image={this.getImage(index)}>
                {e.name}
            </Item>));
        // show only PER_PAGE people
        return arr.slice(this.state.page * PER_PAGE, this.state.page * PER_PAGE + PER_PAGE);
    }

    // handles a click on prev button
    handlePrevClick = () => this.setState({ page: this.state.page > 0 ? this.state.page - 1 : 0 });

    // handles a click on next button
    handleNextClick = () => {
        const n = this.state.filteredPeople.length;
        const maxPage = Math.floor(n / PER_PAGE);
        this.setState({ page: this.state.page < maxPage ? this.state.page + 1 : maxPage });
    }

    render() {
        return (
            <div className="app">
                <img className="logo" src={logo} alt="LOGO" />
                <TextField
                    className="field"
                    placeholder="Search"
                    variant="outlined"
                    color="primary"
                    onChange={this.handleChange}
                    style={{ marginBottom: '20px', width: '300px', backgroundColor: "grey" }}
                    InputProps={{ style: { color: "white" } }}
                />
                <div className={this.state.filteredPeople.length === 0 ? "hide-people" : "people"}>
                    {this.showPeople()}
                </div>
                <div className={this.state.showButtons ? "buttons" : "hide"}>
                    <button className="btn" onClick={this.handlePrevClick}>prev</button>
                    <div className="mark">{this.state.page + 1}</div>
                    <button className="btn" onClick={this.handleNextClick}>next</button>
                </div>
            </div >
        );
    }
}