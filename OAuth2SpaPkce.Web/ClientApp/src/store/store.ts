import {configureStore} from "@reduxjs/toolkit";
import WeatherForecastReducer from './weatherForecast'

export const store = configureStore({
    reducer: {
        weatherForecast: WeatherForecastReducer
    }
});

export type AppDispatch = typeof store.dispatch;