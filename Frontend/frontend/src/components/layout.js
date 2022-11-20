import React from 'react';
import { Row } from 'react-bootstrap';
import NavBar from './NavBar';

export default function layout(props) {
    return (
        <div>
            <Row>
                <NavBar/>
            </Row>
            <main>
                {props.children}
            </main>
        </div>
    )
}