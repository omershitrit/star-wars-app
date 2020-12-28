import React from 'react';
import './item.css';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="item">
                <div className="name">{this.props.name}</div>
                <img className="sword" src={this.props.image} />
            </div>
        );
    }
}