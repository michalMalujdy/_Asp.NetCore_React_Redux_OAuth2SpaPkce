import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux'
import AuthReducer from "./authSlice"

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
});

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();