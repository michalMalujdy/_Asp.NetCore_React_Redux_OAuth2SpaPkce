import React from 'react';
import {connect} from 'react-redux';
import Card from '../../../common/Card/Card';
import Loader from '../../../common/Loader/Loader';

class Login extends React.PureComponent<{}, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = { } as LoginState;
    }

    async componentDidMount() {
        let verifier = this.getStrongRandomValue();
        let challenge = await this.getChallenge(verifier);
        let urlState = this.getStrongRandomValue();

        this.setLocalStorage(verifier, challenge, urlState);

        this.setState({
            verifier,
            challenge,
            urlState
        });
    }

    private setLocalStorage(verifier: string, challenge: string, state: string) {
        localStorage.setItem('verifier', verifier);
        localStorage.setItem('challenge', challenge);
        localStorage.setItem('state', state);
    }

    render() {
        const content = (
            <React.Fragment>
                <h3>Redirect for authorization code</h3>
                <p>It's the beginning of the flow. Code verifier and code challenge are generated. Those two variables are the most important part of the PKCE extension of the flow. Now the user need to be redirected to the prepared URL to obtain the code grant, which will be exchanged for the tokens later. Additionally for PKCE we must include the code challenge in the URL that will be verified by the Authorization Server later.</p>
                <Card title={'Code verifier'} text={this.state.verifier}/>
                <Card title={'Code challenge'} text={this.state.challenge}/>
                <Card title={'State/nonce/CSRF token'} text={this.state.urlState}/>
                <Card title={'URL to Authorization Server'} text={this.getLoginUrl()}/>

                <button className="btn btn-primary" onClick={this.onContinueClick}>Continue</button>
            </React.Fragment>
        );

        return this.state.isLoading
            ? <Loader/>
            : content;
    }

    private getStrongRandomValue = (): string => {
        const array = new Uint32Array(32);
        window.crypto.getRandomValues(array);
        return Array.from(array, Login.dec2hex).join('');
    }

    private static dec2hex = (dec: any): string => {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private sha256 = (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    private base64UrlEncode = (a: ArrayBuffer): string => {
        let str = "";
        const bytes = new Uint8Array(a);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    private getChallenge = async (verifier: string) => {
        const challenge = await this.sha256(verifier);
        return this.base64UrlEncode(challenge);
    }

    private getLoginUrl = () => {
        return 'https://dev-ykfj37bm.us.auth0.com/authorize' +
            '?response_type=code' +
            `&code_challenge=${this.state.challenge}` +
            '&code_challenge_method=S256' +
            '&client_id=gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O' +
            '&redirect_uri=https://localhost:5001/auth/redirect' +
            '&scope=openid email' +
            '&audience=https://dev-ykfj37bm.us.auth0.com/api/v2/' +
            `&state=${this.state.urlState}`;
    }

    private onContinueClick = () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        window.location.replace(this.getLoginUrl());
    }
}

interface LoginState {
    isLoading: boolean,
    verifier: string,
    challenge: string,
    urlState: string
}

const mapStateToProps = (_: any) => {
    return {}
};

const mapDispatchToProps = {
    setCode,
    setUrlState
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);