import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {store} from "./store/store";
import {BrowserRouter as Router} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
