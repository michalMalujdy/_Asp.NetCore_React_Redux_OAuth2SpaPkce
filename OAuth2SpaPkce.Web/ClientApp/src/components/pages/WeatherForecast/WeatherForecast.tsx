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
            headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`},
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