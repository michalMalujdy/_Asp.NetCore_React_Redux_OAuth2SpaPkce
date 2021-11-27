import React from 'react';
import Card from '../../../common/Card/Card';
import Loader from '../../../common/Loader/Loader';
import authService from "../../../../services/AuthService";

export default class Login extends React.PureComponent<{}, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true
        } as LoginState;
    }

    async componentDidMount() {
        const verifier = authService.generateVerifier();
        const challenge = await authService.generateChallenge(verifier);
        const urlState = authService.generateState();

        authService.storeCodeFlowData(verifier, challenge, urlState);

        this.setState({
            verifier,
            challenge,
            urlState,
            isLoading: false
        });
    }

    render() {
        return this.state.isLoading
            ? <Loader/>
            : this.getContent();
    }

    private getContent = () => {
        return (
            <React.Fragment>
                <h3>Redirect for authorization code</h3>
                <p>It's the beginning of the flow. Code verifier and code challenge are generated. Those two variables are the most important part of the PKCE extension of the flow. Now the user need to be redirected to the prepared URL to obtain the code grant, which will be exchanged for the tokens later. Additionally for PKCE we must include the code challenge in the URL that will be verified by the Authorization Server later.</p>
                <Card title={'Code verifier'} text={this.state.verifier}/>
                <Card title={'Code challenge'} text={this.state.challenge}/>
                <Card title={'State/nonce/CSRF token'} text={this.state.urlState}/>
                <Card title={'URL to Authorization Server'} text={authService.getLoginUrl()}/>

                <button className="btn btn-primary" onClick={this.onContinueClick}>Continue</button>
            </React.Fragment>
        );
    }

    private onContinueClick = () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        window.location.replace(authService.getLoginUrl());
    }
}

interface LoginState {
    isLoading: boolean,
    verifier: string,
    challenge: string,
    urlState: string
}