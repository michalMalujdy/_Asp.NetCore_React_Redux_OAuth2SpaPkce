import * as React from 'react';
import {Container, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from 'react-router-dom';

import './NavMenu.css';

export default class NavMenu extends React.Component<{}, NavMenuState> {
    public state = {
        isOpen: false
    };

    public render = (): JSX.Element => {
        return (
            <header>
                <Navbar className="navMenu navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">OAuth2 Authorization Code flow with PKCE in SPA</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export interface NavMenuState {
    isOpen: boolean
}
