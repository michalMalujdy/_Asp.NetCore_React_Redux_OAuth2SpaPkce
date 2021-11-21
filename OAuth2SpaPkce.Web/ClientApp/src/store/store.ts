import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux'
import WeatherForecastReducer from './weatherForecast'

export const store = configureStore({
    reducer: {
        weatherForecast: WeatherForecastReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();