import React from 'react';
import { Link } from 'react-router-dom';
import './item.css';

export default class Item extends React.Component {

    render() {
        return (
            <Link className="link" to={{ pathname: '/star-wars-app/Person', state: { propsToPerson: this.props.data } }}>
                <div className="item">
                    <div className="name">{this.props.data.name}</div>
                    <img className="sword" src={this.props.image} alt="SWORD_IMG" />
                </div>
            </Link >
        );
    }
}