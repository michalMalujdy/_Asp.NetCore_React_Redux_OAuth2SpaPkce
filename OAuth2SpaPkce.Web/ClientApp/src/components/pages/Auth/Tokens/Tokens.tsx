import React from 'react';
import Card from '../../../common/Card/Card';
import {Link} from 'react-router-dom';
import authService from "../../../../services/AuthService";

export default class Tokens extends React.Component<{}, TokenState> {
    constructor(props: any) {
        super(props);

        this.state = {
            accessToken: authService.getAccessToken(),
            idToken: authService.getIdToken()
        }
    }

    render = (): JSX.Element => {
        return(
            <React.Fragment>
                <h3>Authentication success</h3>
                <p>Now you are fully logged in and the whole authentication process is done - we got the access_token and the id_token. They will be stored in the local storage and they will be used each time a request to the API is made. This means you can proceed and access the next weather forecast page which is accessbile to logged in users only.</p>
                <Card title={'access_token'} text={this.state.accessToken}/>
                <Card title={'id_token'} text={this.state.idToken}/>

                <Link to='/weather-forecast'>
                    <button className="btn btn-primary">Continue</button>
                </Link>
            </React.Fragment>
        )
    }
}

interface TokenState {
    accessToken: string,
    idToken: string
}