import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './person.css';
import PersonImage from '../photos/person.png';
import YudaImage from '../photos/yuda.png';

class Person extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            data: props.location.state.propsToPerson
        };
    }

    showArray = arr => arr.map((e, index) => <div className="attr-style" key={index}>{e}</div>);

    showData = (e) => {
        if (Array.isArray(e)) {
            return <div className="data">
                {e.map((el, index) => <div className="value">{el}</div>)}
            </div>
        }
        return <div className="value">{e}</div>;
    }

    getCells = () => {
        const enteries = Object.entries(this.state.data);
        return enteries.map((e, index) => (
            <div className="cell" key={index}>
                <div className="headline">{e[0]}:</div>
                {this.showData(e[1])}
            </div>
        ))
    }

    //getHeadlines = () => Object.entries(this.state.data).map((e, index) => <div className="cell">{e}</div>)

    render() {
        return (
            <div className="person">
                <img className="img" src={PersonImage} />
                <img className="img2" src={YudaImage} />
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