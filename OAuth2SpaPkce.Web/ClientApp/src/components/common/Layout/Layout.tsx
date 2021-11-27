import * as React from 'react';
import {Container} from 'reactstrap';
import NavMenu from './../NavMenu/NavMenu';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render = (): JSX.Element => {
        return (
            <React.Fragment>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}