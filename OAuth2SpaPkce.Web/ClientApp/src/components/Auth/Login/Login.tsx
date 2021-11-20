﻿import React from "react";
import {connect} from "react-redux";
import {Code, setCode, setUrlState} from '../../../store/authSlice';
import Loader from "../../Loader/Loader";
import {randomBytes} from "crypto";

class Login extends React.PureComponent<LoginProps> {

    async componentDidMount() {
        // let verifier = this.getStrongRandomValue();
        // let challenge = await this.getChallenge(verifier);
        let verifier = 'abcdefghijklmnoprst';
        let challenge = '4f424715079a9dad2067ce15f2d7a24ece588614784c67ae8a0a8714f0ae024b';
        let state = this.getStrongRandomValue();

        localStorage.setItem('verifier', verifier);
        localStorage.setItem('challenge', challenge);
        localStorage.setItem('state', state);

        this.props.setCode({
            verifier, challenge
        });

        this.props.setUrlState(state);

        const url = 'https://dev-ykfj37bm.us.auth0.com/authorize' +
            '?response_type=code' +
            `&code_challenge=yxah08axv4zAWDSuE_TgJtL1MKCG0si7HE3fneAqXRo` +
            '&code_challenge_method=S256' +
            '&client_id=gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O' +
            '&redirect_uri=https://localhost:5001/auth/redirect' +
            '&scope=openid email' +
            '&audience=https://dev-ykfj37bm.us.auth0.com/api/v2/' +
            `&state=${state}`;

        window.location.replace(url);
    }

    render() {
        return <Loader/>
    }

    private getStrongRandomValue(): string {
        const array = new Uint32Array(32);
        window.crypto.getRandomValues(array);
        return Array.from(array, Login.dec2hex).join('');
    }

    private static dec2hex(dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private sha256(plain: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    private base64urlencode(a: ArrayBuffer) {
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

    private async getChallenge(verifier: string) {
        const challenge = await this.sha256(verifier);
        return this.base64urlencode(challenge);
    }
}

interface LoginProps {
    verifier: string,
    challenge: string,
    setCode: (code: Code) => void,
    setUrlState: (urlState: string) => void;
}

const mapStateToProps = (_: any) => {
    return {}
};

const mapDispatchToProps = {
    setCode,
    setUrlState
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);