import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Redirect from "./components/Auth/Redirect/Redirect";
import Tokens from "./components/Auth/Tokens/Tokens";

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/redirect' component={Redirect} />
        <Route exact path='/auth/tokens' component={Tokens} />
    </Layout>
);
