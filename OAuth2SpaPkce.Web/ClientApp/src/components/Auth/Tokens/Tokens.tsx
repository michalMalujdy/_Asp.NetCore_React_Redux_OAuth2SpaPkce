import React from "react";
import Card from "../../Card/Card";

export default class Tokens extends React.Component<any, TokenState> {
    constructor(props: any) {
        super(props);

        this.state = {
            accessToken: localStorage.getItem('accessToken') as string,
            idToken: localStorage.getItem('idToken') as string
        }
    }

    render() {
        return(
            <React.Fragment>
                <Card title={'access_token'} text={this.state.accessToken}/>
                <Card title={'id_token'} text={this.state.idToken}/>
            </React.Fragment>
        )
    }
}

interface TokenState {
    accessToken: string,
    idToken: string
}