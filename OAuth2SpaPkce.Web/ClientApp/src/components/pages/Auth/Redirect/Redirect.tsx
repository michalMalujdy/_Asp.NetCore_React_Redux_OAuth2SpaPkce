import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import qs from 'qs';
import Card from "../../../common/Card/Card";
import Loader from "../../../common/Loader/Loader";

class Redirect extends Component<RedirectProps, RedirectState> {

    constructor(props: RedirectProps) {
        super(props);

        this.state = { } as RedirectState;
    }

    async componentDidMount() {
        const query = new URLSearchParams(window.location.search);
        const queryUrlState = query.get('state') as string;
        const queryCode = query.get('code') as string;

        const urlState = localStorage.getItem('state') as string;
        const isCsrfTokenValid = queryUrlState === urlState;

        this.setState({
            ...this.state,
            verifier: localStorage.getItem('verifier') as string,
            challenge: localStorage.getItem('challenge') as string,
            urlState: localStorage.getItem('state') as string,
            code: queryCode,
            isCsrfTokenValid: isCsrfTokenValid
        });

        if (!isCsrfTokenValid) {
            return;
        }
    }

    render() {
        return this.state.isLoading
            ? <Loader/>
            : this.getContent();
    }

    private getContent = () => (
        <React.Fragment>
            <h3>Redirect for authorization code</h3>
            <p>The authorization went smoothly and the authorization code is here. We need to exchange it now for the tokens. Additionaly for PKCE we must include the code verifier to prove our authenticity.</p>
            <Card title={'Authorization code'} text={this.state.code}/>
            <Card title={'Code verifier'} text={this.state.verifier}/>
            <Card title={'Code challenge'} text={this.state.challenge}/>
            <Card title={'State/nonce/Anti CSRF token'} text={this.state.urlState}/>

            <button className="btn btn-primary" onClick={this.onContinueClick}>Continue</button>
        </React.Fragment>
    );

    private async getTokens(codeVerifier: string, urlCode: string) {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O',
            code_verifier: codeVerifier,
            code: urlCode,
            redirect_uri: 'https://localhost:5001/auth/redirect'
        };

        const config: any = {
            method: 'POST',
            url: 'https://dev-ykfj37bm.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data)
        };

        return await axios.request(config);
    }

    private onContinueClick = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        const response = await this.getTokens(this.state.verifier, this.state.code);

        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('idToken', response.data.id_token);

        this.props.history.push('/auth/tokens')
    }
}

interface RedirectProps {
    history: any
}

interface RedirectState {
    isLoading: boolean,
    verifier: string,
    challenge: string,
    urlState: string,
    code: string,
    isCsrfTokenValid: boolean
}

export default withRouter(Redirect)