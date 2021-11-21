import * as React from 'react';
import { Route } from 'react-router';
import Home from './components/pages/Home/Home';
import Layout from './components/common/Layout/Layout';
import Login from './components/pages/Auth/Login/Login';
import Redirect from './components/pages/Auth/Redirect/Redirect';
import Tokens from './components/pages/Auth/Tokens/Tokens';
import WeatherForecast from "./components/pages/WeatherForecast/WeatherForecast";

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/redirect' component={Redirect} />
        <Route exact path='/auth/tokens' component={Tokens} />
        <Route exact path='/weather-forecast' component={WeatherForecast} />
    </Layout>
);
