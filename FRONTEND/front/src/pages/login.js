import React, {useContext, useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, Navigate} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
import {login} from "../components/auth";
import Cookies from 'js-cookie';
import {Context} from "../components/reducer";
import {Snackbar} from "@mui/material";



export default function Login (){
    const { state, dispatch } = useContext(Context)
    const [open, setOpen] = useState(false);
    const [openAut, setOpenAut] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;
    const onSubmit = e => {
        e.preventDefault();
        setOpenAut(true)
        login(username, password).then(status => {
            console.log('DISPATCH LOGIN', status)
            dispatch(status)
        })
        setOpenAut(false)
    };

    if (state.isAuthenticated) {
        return <Navigate to='/'/>
    }

    const handleAdd = async () =>{
        if (!openAut) {
            setOpen(true);
        }
        else {
            setOpen(false);
        }

    }
    const handleClose = async () =>{
        setOpen(false);
    }



    function validateForm() {
        return formData.username.length > 0 && formData.password.length > 5;
    }



    return (
        <div className="Login">
            <Snackbar
                open={open}
                anchorOrigin={ {vertical: 'bottom', horizontal: 'right'} }
                autoHideDuration={3000}
                onClose={handleClose}
                message="Пароль или логин неверный!"
            />
            <Form onSubmit={event => onSubmit(event)}>
                    <CSRFToken />
                <h2>Аптека</h2>
                <Form.Group className={"username"} controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder='Имя пользователя'
                        value={username}
                        onChange={(e) => setFormData({ ...formData, username : e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className={"password"} controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder='Пароль'
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </Form.Group>
                <Button className={'LoginButton'} block="true" variant={"dark"} size="lg" type="submit" disabled={!validateForm()}  onClick={handleAdd}>
                    Войти
                </Button>
                <p>Еще не зарегистрированы?  <Link to={"/registration"}>Зарегистрируйтесь сейчас</Link></p>
            </Form>
        </div>
    );
}
