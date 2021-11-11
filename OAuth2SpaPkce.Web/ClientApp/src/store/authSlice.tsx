// @ts-ignore
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AuthState = {
    code: {
        verifier: '',
        challenge: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCode(state: any, action: PayloadAction<Code>) {
            state.code = action.payload;
        },
        clearCode(state: any) {
            state = initialState;
        }
    }
});

export interface AuthState {
    code: Code
}

export interface Code {
    verifier: string,
    challenge: string
}

export const { setCode, clearCode } = authSlice.actions;
export default authSlice.reducer;