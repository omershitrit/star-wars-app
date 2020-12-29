import React from 'react';
import { Link } from 'react-router-dom';
import './item.css';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //handleClick = () => this.props.handleClick(this.props.name)
    handleClick = () => { }

    render() {
        return (
            <Link className="link" to={{ pathname: '/star-wars-app/Person', state: { propsToPerson: this.props.data } }}>
                <div className="item" onClick={this.handleClick}>
                    <div className="name">{this.props.data.name}</div>
                    <img className="sword" src={this.props.image} />
                </div>
            </Link >
        );
    }
}