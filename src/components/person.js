import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './person.css';
import PersonImage from '../photos/person.png';

class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.propsToPerson
        };
    }

    // need also show the arrays!
    showData = () => {
        const values = Object.values(this.state.data); // it is possible also to show keys, enteries instead of values
        return values.map((e, index) => {
            if (!Array.isArray(e)) {
                return <div className="attr-style" key={index}>{e}</div>
            }
        })
    }

    render() {
        return (
            <div className="person">
                <img className="img" src={PersonImage} />
                <div className="data">
                    {this.showData()}
                    < Link className="button" to="/star-wars-app" > Back</Link >
                </div>

            </div >
        );
    }
}

export default withRouter(Person)