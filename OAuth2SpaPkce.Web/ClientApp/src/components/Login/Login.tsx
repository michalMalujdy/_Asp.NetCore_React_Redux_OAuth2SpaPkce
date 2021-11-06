import React from "react";

export default class Login extends React.PureComponent {
    async componentDidMount() {
        let verifier = this.getVerifier();
        console.log(`Verifier: ${verifier}`);

        let challenge = await this.getChallenge(verifier);
        console.log(`Challenge urlEncoded: ${challenge}`);
    }

    render() {
        return (<>Logging in</>)
    }

    private getVerifier(): string {
        const array = new Uint32Array(56 / 2);
        window.crypto.getRandomValues(array);
        return Array.from(array, Login.dec2hex).join('');
    }

    private static dec2hex(dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private sha256(plain: string) { // returns promise ArrayBuffer
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
        console.log(`Challenge byte: ${challenge}`);
        return this.base64urlencode(challenge);
    }
}