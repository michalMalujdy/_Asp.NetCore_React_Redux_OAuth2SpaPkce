import React from 'react';
import axios from 'axios';
import {Forecast} from '../../../models/forecast';
import {setForecasts} from '../../../store/weatherForecast';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class WeatherForecast extends React.Component<WeatherForecastProps, WeatherForecastState> {

    private baseUrl: string = '/api/WeatherForecast';

    constructor(props: WeatherForecastProps) {
        super(props);

        this.state = {
            wasRequestSuccessful: false
        }
    }

    componentDidMount = async (): Promise<void> => {
        const config: any = {
            method: 'GET',
            url: this.baseUrl,
            headers: this.getAuthorizationHeader(),
        };

        const response = await axios.request(config);
        const wasRequestSuccessful = response.status === 200;

        this.setState({
            ...this.state,
            wasRequestSuccessful
        });

        if (wasRequestSuccessful) {
            this.props.setForecasts(response.data);
        }
    }

    render = (): JSX.Element => {
        return this.state.wasRequestSuccessful
            ? this.renderContent()
            : this.renderUnauthorized();
    }

    private getAuthorizationHeader = (): any => {
        return {'Authorization': `bearer ${localStorage.getItem('accessToken')}`};
    };

    private renderContent = (): JSX.Element => {
        return (
            <React.Fragment>
                <h3 id="tabelLabel">Weather forecast</h3>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature [C]</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.forecasts.map((forecast: Forecast) =>
                        <tr key={forecast.date}>
                            <td>{new Date(forecast.date).toLocaleDateString('pl-PL')}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <p>
                    You can log out to go through the whole process once again.
                </p>
                <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
            </React.Fragment>
        );
    }

    private renderUnauthorized = (): JSX.Element => {
        return (
            <React.Fragment>
                <p>You cannot see the page as you are not logged in. Log in first.</p>
                <Link to='/'>
                    <button className="btn btn-primary">Login</button>
                </Link>
            </React.Fragment>
        );
    }

    private onLogoutClick = (): void => {
        localStorage.removeItem('verifier');
        localStorage.removeItem('challenge');
        localStorage.removeItem('state');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');

        window.location.replace(this.getLogoutUrl());
    }

    private getLogoutUrl = (): string => {
        return 'https://dev-ykfj37bm.us.auth0.com/v2/logout' +
            '?client_id=gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O' +
            '&returnTo=https://localhost:5001';
    }
}

interface WeatherForecastProps {
    forecasts: Forecast[],
    setForecasts: (forecasts: Forecast[]) => void;
}

interface WeatherForecastState {
    wasRequestSuccessful: boolean
}

const mapStateToProps = (state: any): any => {
    return {
        forecasts: state.weatherForecast.forecasts
    }
};

const mapDispatchToProps = {
    setForecasts
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast)