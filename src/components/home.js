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

    handleChange = (e) => {
        const value = e.target.value;
        const newFilteredPeople = this.state.people.filter(el => el.name.toLowerCase().startsWith(value)
            || el.name.toUpperCase().startsWith(value)
            || el.name.startsWith(value));
        this.setState({ filteredPeople: newFilteredPeople, showButtons: newFilteredPeople.length > PER_PAGE, page: 0 });
    }

    calculateImage = (index) => {
        const r = index % 4;
        if (r === 0) { return GreenSword; }
        if (r === 1) { return PurpleSword; }
        if (r === 2) { return BlueSword; }
        if (r === 3) { return redSword; }
    }

    showPeople = () => {
        let arr = this.state.filteredPeople.map((e, index) => (
            <Item
                key={index}
                className="item"
                data={e}
                image={this.calculateImage(index)}>
                {e.name}
            </Item>));
        return arr.slice(this.state.page * PER_PAGE, this.state.page * PER_PAGE + PER_PAGE);
    }

    handlePrevClick = () => this.setState({ page: this.state.page > 0 ? this.state.page - 1 : 0 });

    handleNextClick = () => {
        const n = this.state.filteredPeople.length;
        const maxPage = Math.floor(n / PER_PAGE);
        this.setState({ page: this.state.page < maxPage ? this.state.page + 1 : maxPage });
    }


    render() {
        return (
            <div className="app">
                <img className="logo" src={logo} />
                <TextField
                    className="field"
                    placeholder="Search"
                    variant="outlined"
                    color="primary"
                    style={{ backgroundColor: "red" }}
                    onChange={this.handleChange}
                    style={{ marginBottom: '20px', width: '300px', backgroundColor: "grey" }}
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                />
                <div className={this.state.filteredPeople.length === 0 ? "hide-people" : "people"}>
                    {this.showPeople()}
                </div>
                <div className="buttons">
                    <button className={this.state.showButtons ? "btn" : "hide"} onClick={this.handlePrevClick}>prev</button>
                    <div className={this.state.showButtons ? "mark" : "hide"}>{this.state.page + 1}</div>
                    <button className={this.state.showButtons ? "btn" : "hide"} onClick={this.handleNextClick}>next</button>

                </div>
            </div >
        );
    }
}