import React from "react";
import {connect} from "react-redux";
import {Code, clear} from "../../../store/authSlice";
import Loader from "../../Loader/Loader";
import axios from "axios";

class Redirect extends React.Component<RedirectProps, RedirectState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isCsrfTokenValid: false
        }
    }

    componentDidMount() {
        const state = localStorage.getItem('state');
        const codeVerifier = localStorage.getItem('verifier');
        const query = new URLSearchParams(window.location.search);
        const urlState = query.get('state');
        const urlCode = query.get('code');

        const isCsrfTokenValid = state === urlState;
        this.setState({
            ...this.state,
            isCsrfTokenValid: isCsrfTokenValid
        });

        if (!isCsrfTokenValid) {
            this.props.clear();
            return;
        }

        console.log(codeVerifier);
        console.log(urlCode)

        // const options: any = {
        //     method: 'POST',
        //     url: 'https://dev-ykfj37bm.us.auth0.com/oauth/token',
        //     headers: {'content-type': 'application/x-www-form-urlencoded'},
        //     data: {
        //         grant_type: 'authorization_code',
        //         client_id: 'gxrNnJJckTJmeKYTK6GplVtEOJ0Drd9O',
        //         code_verifier: codeVerifier,
        //         code: urlCode,
        //         redirect_uri: 'https://localhost:5001/auth/redirect'
        //     }
        // };
        //
        // axios.request(options).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log('error from auth0: ' + error);
        // });
    }

    render() {
        return this.state.isCsrfTokenValid
            ? <Loader/>
            : <p>Authentication error</p>;
    }
}

interface RedirectProps {
    code: Code,
    state: string,
    clear: () => void;
}

interface RedirectState {
    isCsrfTokenValid: boolean
}

const mapStateToProps = (state: any) => {
    return {
        code: state.auth.code,
        state: state.auth.state
    };
}

const mapDispatchToProps = {
    clear
};

export default connect(mapStateToProps, mapDispatchToProps)(Redirect)