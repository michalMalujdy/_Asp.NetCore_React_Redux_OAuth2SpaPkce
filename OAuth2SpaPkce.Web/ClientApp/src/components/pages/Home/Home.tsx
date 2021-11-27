import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
    render = (): JSX.Element => {
        return (
            <div>
                <p>This is a demo of Single Page Application implementation of Authorization Code flow with PKCE which is a OAuth2 standard, described in much more details in <a target="_blank" href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-01#section-4.1" className="link-primary">the official documentation</a>.</p>
                <p>In the demo you can monitor each step having insights into the core variables being used in the flow.</p>
                <p>Auth0 was chosen as the Authorization Server as it's well documented and allows a free version for low-traffic applications</p>
                <p>You can start the flow by clicking on the button below</p>
                <Link to="/auth/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
            </div>
        )
    }
}