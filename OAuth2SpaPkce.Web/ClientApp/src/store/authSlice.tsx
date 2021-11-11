// @ts-ignore
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    verifier: string,
    challenge: string
}

const initialState: AuthState = {
    verifier: '',
    challenge: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setVerifier(state: any, action: PayloadAction<string>) {
            state.verifier = action.payload;
        },
        setChallenge(state: any, action: PayloadAction<string>) {
            state.challenge = action.payload;
        },
        clear(state: any) {
            state.verifier = null;
            state.challenge = null;
        }
    }
});

export const { setVerifier, setChallenge, clear } = authSlice.actions;
export default authSlice.reducer;