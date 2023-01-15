import React, {useContext, useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CSRFToken from "../components/CSRFToken";
import {Context} from "../components/reducer";
import {register} from "../components/auth";
import {Navigate} from "react-router-dom";


export default function Register (){
    const { state, dispatch } = useContext(Context)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, email, password, re_password } = formData;

    function validateForm() {
        return formData.username.length > 0 && formData.password.length > 5 && formData.re_password.length > 5;
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            console.log(username, email, password, re_password)
            register(username, email, password, re_password).then(status => {
                dispatch({ type: status, payload: {} })
            })
            setAccountCreated(true);
    };}

    if (state.isAuthenticated)
        return <Navigate to='/'/>;
    else if (accountCreated)
        return <Navigate to='/login'/>;

    return (
        <div className="Register">
            <Form onSubmit={event => onSubmit(event)}>
                <CSRFToken />
                <h2>Регистрация</h2>
                <Form.Group className={"username"} controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setFormData({ ...formData, username : e.target.value })}
                    />

                </Form.Group>
                <Form.Group className={"email"} controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setFormData({ ...formData, email : e.target.value })}
                    />
                </Form.Group>
                <Form.Group className={"password"} controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setFormData({ ...formData, password : e.target.value })}
                    />
                </Form.Group>
                <Form.Group className={"repassword"} controlId="repassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={re_password}
                        onChange={(e) => setFormData({ ...formData, re_password : e.target.value })}
                    />
                </Form.Group>
                <Button className={'LoginButton'} block="true" variant={"dark"} size="lg" type="submit" disabled={!validateForm()}>
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
}