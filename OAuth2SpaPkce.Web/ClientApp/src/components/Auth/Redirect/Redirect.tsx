import React from "react";
import {connect} from "react-redux";
import {Code, clear} from "../../../store/authSlice";
import Loader from "../../Loader/Loader";

class Redirect extends React.Component<RedirectProps, RedirectState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isCsrfTokenValid: false
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(window.location.search);
        const state = query.get('state');
        const code = query.get('code');

        const isCsrfTokenValid = this.props.state === state;
        this.setState({
            ...this.state,
            isCsrfTokenValid: isCsrfTokenValid
        });

        if (!isCsrfTokenValid) {
            this.props.clear();
            return;
        }

        // call for the tokens
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