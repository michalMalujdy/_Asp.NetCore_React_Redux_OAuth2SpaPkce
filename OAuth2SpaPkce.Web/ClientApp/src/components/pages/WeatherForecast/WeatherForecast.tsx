import React from 'react';
import axios from 'axios';
import { Forecast } from '../../../models/forecast';
import { setForecasts } from '../../../store/weatherForecast';
import { connect } from 'react-redux';

class WeatherForecast extends React.Component<WeatherForecastProps, WeatherForecastState> {

    private baseUrl: string = '/api/WeatherForecast';

    async componentDidMount() {
        const config: any = {
            method: 'GET',
            url: this.baseUrl,
            headers: {'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhEOTRqX2piR2Z2OHFGNVV0WEdxLSJ9.eyJpc3MiOiJodHRwczovL2Rldi15a2ZqMzdibS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTczNDY1NjE3Njk4NzI2NTIzODEiLCJhdWQiOlsiaHR0cHM6Ly9kZXYteWtmajM3Ym0udXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi15a2ZqMzdibS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjM3NTEzNDc2LCJleHAiOjE2Mzc1OTk4NzYsImF6cCI6Imd4ck5uSkpja1RKbWVLWVRLNkdwbFZ0RU9KMERyZDlPIiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.narsWJuA6K-jdsznecKw9uEY5nm14t6ZyZx583898YslniqD-QNRoVkf9O22_UoshcDakNARxj08kwrxNHXYCffwcYFlyAOcZCPiMXI7AdqzKjqK3SbGbwweYh4laWfKhzWNWk1tfD-wWODM3MWRy9hvrHQFSJghZ282zEfor8wHRswzRhJhOI1xU6PHv__bwv-2SrXXXZYyJUU4eB61o1H6HYfY5U_q6DDXgXsy1al3iTWO6a88vIlKjV9Z6jSBvFwH78tMCfCtYZ-0fieZqPmWIQvArbavu9oUtZTKItN1-b35DM2aBlWsP0pvw0Ffjuwrm0EAWeYivpdCAO1eHw'},
        };

        const response = await axios.request(config);
        console.log(response);
        this.props.setForecasts(response.data as Forecast[]);
    }

    render() {
        return (
            <React.Fragment>
                <h3 id="tabelLabel">Weather forecast</h3>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.forecasts.map((forecast: Forecast) =>
                        <tr key={forecast.date.toString()}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

interface WeatherForecastProps {
    forecasts: Forecast[],
    setForecasts: (forecasts: Forecast[]) => void;
}

interface WeatherForecastState {
    forecasts: Forecast[]
}

const mapStateToProps = (state: any) => {
    return {
        forecasts: state.weatherForecast.forecasts
    }
}

export default connect(mapStateToProps, { setForecasts })(WeatherForecast)