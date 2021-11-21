import React from 'react';
import Card from "../../../common/Card/Card";

export default class Tokens extends React.Component<{}, TokenState> {
    constructor(props: any) {
        super(props);

        this.state = {
            accessToken: localStorage.getItem('accessToken') as string,
            idToken: localStorage.getItem('idToken') as string
        }
    }

    render() {
        return(
            <React.Fragment>
                <h3>Authentication success</h3>
                <p>The whole authentication process is done - we got the access_token and the id_token. You can logout to go through the process again.</p>
                <Card title={'access_token'} text={this.state.accessToken}/>
                <Card title={'id_token'} text={this.state.idToken}/>

                <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
            </React.Fragment>
        )
    }

    private onLogoutClick = () => {
        localStorage.removeItem('verifier');
        localStorage.removeItem('challenge');
        localStorage.removeItem('state');

        window.location.replace(this.getLogoutUrl());
    }

    private getLogoutUrl = (): string => {
        return 'https://dev-ykfj37bm.us.auth0.com/v2/logout' +
            '?client_id=gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O' +
            '&returnTo=https://localhost:5001';
    }
}

interface TokenState {
    accessToken: string,
    idToken: string
}