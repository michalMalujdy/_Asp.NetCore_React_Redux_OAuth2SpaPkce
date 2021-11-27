import React from 'react';

import './Card.scss';

export default class Card extends React.Component<CardProps> {
    render = (): JSX.Element => {
        return(
            <div className="card w-75 app-card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.text}</p>
                </div>
            </div>
        )
    }
}

interface CardProps {
    title: string,
    text: string
}