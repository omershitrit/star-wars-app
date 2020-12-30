import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './person.css';
import PersonImage from '../photos/person.png';
import YudaImage from '../photos/yuda.png';

class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.propsToPerson
        };
    }

    // used to show the data in an array, for example: films
    showArray = arr => arr.map((e, index) => <div className="value" key={index}>{e}</div>)

    // shows the data; if its an array uses the above function
    showData = e => Array.isArray(e) ? <div className="data">{this.showArray(e)}</div> : <div className="value">{e}</div>

    // generate the data
    getCells = () => {
        const enteries = Object.entries(this.state.data);
        return enteries.map((e, index) => (
            <div className="cell" key={index}>
                <div className="headline">{e[0]}:</div>
                {this.showData(e[1])}
            </div>
        ));
    }

    render() {
        return (
            <div className="person">
                <img className="img" src={PersonImage} alt="BG_IMAGE" />
                <img className="img2" src={YudaImage} alt="BG_IMAGE" />
                <div className="container">
                    <div className="data">
                        {this.getCells()}
                    </div>
                    < Link className="button" to="/star-wars-app" >Back</Link >
                </div>
            </div >
        );
    }
}

export default withRouter(Person)