import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import Login from "./components/Login/Login";

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth/login' component={Login} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
