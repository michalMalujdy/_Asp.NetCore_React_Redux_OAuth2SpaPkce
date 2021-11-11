import React from "react";
import {connect} from "react-redux";
import {setCode, Code} from '../../store/authSlice';

class Login extends React.PureComponent<LoginProps> {

    async componentDidMount() {
        let verifier = this.getVerifier();
        let challenge = await this.getChallenge(verifier);

        this.props.setCode({
            verifier, challenge
        });
    }

    render() {
        return (<>Logging in</>);
    }

    private getVerifier(): string {
        const array = new Uint32Array(56 / 2);
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
    setCode: (code: Code) => void;
}

const mapStateToProps = (state: any) => {
    return {
        verifier: state.auth.verifier,
        challenge: state.auth.challenge
    }
};

const mapDispatchToProps = {
    setCode
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);