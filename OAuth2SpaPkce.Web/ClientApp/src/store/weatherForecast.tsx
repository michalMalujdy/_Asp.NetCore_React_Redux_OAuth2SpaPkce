import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Forecast} from '../models/forecast';

const initialState: WeatherForecastState = {
    forecasts: []
};

const weatherForecastSlice = createSlice({
    name: 'weatherForecast',
    initialState: initialState,
    reducers: {
        setForecasts(state: any, action: PayloadAction<Forecast[]>) {
            state.forecasts = action.payload;
        }
    }
});

export interface WeatherForecastState {
    forecasts: Forecast[]
}

export const { setForecasts } = weatherForecastSlice.actions;
export default weatherForecastSlice.reducer;