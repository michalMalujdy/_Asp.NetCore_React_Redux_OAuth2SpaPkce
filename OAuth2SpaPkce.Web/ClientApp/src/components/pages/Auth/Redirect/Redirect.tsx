import React from 'react';
import {withRouter} from 'react-router';
import Card from '../../../common/Card/Card';
import Loader from '../../../common/Loader/Loader';
import authService from '../../../../services/AuthService';

class Redirect extends React.Component<RedirectProps, RedirectState> {

    constructor(props: RedirectProps) {
        super(props);
        this.state = { } as RedirectState;
    }

    componentDidMount = (): void => {
        authService.readCodeFromRedirectUri(window.location.search);

        this.setState({
            ...this.state,
            verifier: authService.getVerifier(),
            challenge: authService.getChallenge(),
            urlState: authService.getState(),
            code: authService.getCode(),
            isCsrfTokenValid: authService.isCsrfTokenValid()
        });
    }

    render = (): JSX.Element => {
        return this.state.isLoading
            ? <Loader/>
            : this.getContent();
    }

    private getContent = (): JSX.Element => (
        <React.Fragment>
            <h3>Redirect for authorization code</h3>
            <p>The authorization went smoothly and the authorization code is here. We need to exchange it now for the tokens. Additionaly for PKCE we must include the code verifier to prove our authenticity.</p>
            <Card title="Authorization code" text={this.state.code}/>
            <Card title="Code verifier" text={this.state.verifier}/>
            <Card title="Code challenge" text={this.state.challenge}/>
            <Card title="State/nonce/Anti CSRF token" text={this.state.urlState}/>

            <button className="btn btn-primary" onClick={this.onContinueClick}>Continue</button>
        </React.Fragment>
    )

    private onContinueClick = async (): Promise<void> => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        await authService.requestTokens(this.state.code);

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