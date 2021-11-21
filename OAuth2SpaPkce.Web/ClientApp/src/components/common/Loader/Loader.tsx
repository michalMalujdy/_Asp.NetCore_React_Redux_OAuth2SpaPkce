﻿import React from 'react';

import './Loader.scss';

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader-wrapper">
                <div className="spinner-border loader-spinner" role="status"/>
            </div>
        )
    }
}