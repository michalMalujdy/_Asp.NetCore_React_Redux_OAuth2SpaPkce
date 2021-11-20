import React from "react";
import {Link} from "react-router-dom";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Welcome text, description</p>
                <Link to="/auth/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
            </div>
        )
    }
}