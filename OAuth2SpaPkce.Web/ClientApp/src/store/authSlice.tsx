// @ts-ignore
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AuthState = {
    code: {
        verifier: '',
        challenge: ''
    },
    urlState: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCode(state: any, action: PayloadAction<Code>) {
            state.code = action.payload;
        },
        setUrlState(state: any, action: PayloadAction<string>) {
            state.urlState = action.payload;
        },
        clear(state: any) {
            state = initialState;
        }
    }
});

export interface AuthState {
    code: Code,
    urlState: string
}

export interface Code {
    verifier: string,
    challenge: string
}

export const { setCode, setUrlState, clear } = authSlice.actions;
export default authSlice.reducer;