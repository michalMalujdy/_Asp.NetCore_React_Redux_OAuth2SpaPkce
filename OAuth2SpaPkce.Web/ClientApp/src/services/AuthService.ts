import qs from "qs";
import axios from "axios";

export class AuthService {
    private verifierStorageKey = 'verifier';
    private challengeStorageKey = 'challenge';
    private stateStorageKey = 'state';
    private codeStorageKey = 'code';
    private redirectUrlStateStorageKey = 'redirectUrlState';
    private accessTokenStorageKey = 'accessToken';
    private idTokenStorageKey = 'idToken';

    public generateVerifier = (): string => {
        return this.getStrongRandomValue();
    }

    public getVerifier = (): string => {
        return localStorage.getItem(this.verifierStorageKey) as string;
    }

    public generateChallenge = async (verifier: string): Promise<string> => {
        const challenge = await this.sha256(verifier);
        return this.base64UrlEncode(challenge);
    }

    public getChallenge = (): string => {
        return localStorage.getItem(this.challengeStorageKey) as string;
    }

    public generateState = (): string => {
        return this.getStrongRandomValue();
    }

    public getState = (): string => {
        return localStorage.getItem(this.stateStorageKey) as string;
    }

    public getCode = (): string => {
        return localStorage.getItem(this.codeStorageKey) as string;
    }

    public getRedirectUrlState = (): string => {
        return localStorage.getItem(this.redirectUrlStateStorageKey) as string;
    }

    public isCsrfTokenValid = (): boolean => {
        return !!this.getState() && this.getState() === this.getRedirectUrlState();
    }

    public getAccessToken = (): string => {
        return localStorage.getItem(this.accessTokenStorageKey) as string;
    }

    public getIdToken = (): string => {
        return localStorage.getItem(this.idTokenStorageKey) as string;
    }

    public storeCodeFlowData = (verifier: string, challenge: string, state: string): void  => {
        localStorage.setItem(this.verifierStorageKey, verifier);
        localStorage.setItem(this.challengeStorageKey, challenge);
        localStorage.setItem(this.stateStorageKey, state);
    }

    public getLoginUrl = (): string => {
        if (!localStorage.getItem(this.verifierStorageKey) && !localStorage.getItem(this.challengeStorageKey)) {
            throw new Error('Generate and store the code flow data first.')
        }

        return 'https://dev-ykfj37bm.us.auth0.com/authorize' +
            '?response_type=code' +
            `&code_challenge=${localStorage.getItem(this.challengeStorageKey)}` +
            '&code_challenge_method=S256' +
            '&client_id=gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O' +
            '&redirect_uri=https://localhost:5001/auth/redirect' +
            '&scope=openid email' +
            '&audience=https://dev-ykfj37bm.us.auth0.com/api/v2/' +
            `&state=${localStorage.getItem(this.stateStorageKey)}`;
    }

    public readCodeFromRedirectUri = (redirectUri: string): void => {
        const query = new URLSearchParams(redirectUri);

        const code = query.get('code') as string;
        localStorage.setItem(this.codeStorageKey, code);

        const queryUrlState = query.get('state') as string;
        localStorage.setItem(this.redirectUrlStateStorageKey, queryUrlState);
    }

    public requestTokens = async (urlCode: string): Promise<void> => {
        const data = {
            grant_type: 'authorization_code',
            client_id: 'gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O',
            code_verifier: this.getVerifier(),
            code: urlCode,
            redirect_uri: 'https://localhost:5001/auth/redirect'
        };

        const config: any = {
            method: 'POST',
            url: 'https://dev-ykfj37bm.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data)
        };

        const response = await axios.request(config);

        localStorage.setItem(this.accessTokenStorageKey, response.data.access_token);
        localStorage.setItem(this.idTokenStorageKey, response.data.id_token);
    }

    private getStrongRandomValue = (): string => {
        const array = new Uint32Array(32);
        window.crypto.getRandomValues(array);

        return Array.from(array, this.dec2hex).join('');
    }

    private dec2hex = (dec: any): string => {
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
}

const authService = new AuthService();
Object.freeze(authService);
export default authService;