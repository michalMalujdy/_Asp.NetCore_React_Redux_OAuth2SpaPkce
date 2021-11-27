export class AuthService {
    private verifierStorageKey = 'verifier';
    private challengeStorageKey = 'challenge';
    private stateStorageKey = 'state';

    public generateVerifier = () => this.getStrongRandomValue();
    public generateState = () => this.getStrongRandomValue();

    public generateChallenge = async (verifier: string) => {
        const challenge = await this.sha256(verifier);
        return this.base64UrlEncode(challenge);
    };

    public storeCodeFlowData = (verifier: string, challenge: string, state: string) => {
        localStorage.setItem(this.verifierStorageKey, verifier);
        localStorage.setItem(this.challengeStorageKey, challenge);
        localStorage.setItem(this.stateStorageKey, state);
    };

    public getLoginUrl = () => {
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
    };

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
export default  authService;