import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Api } from "../components/api/pharmacyApi.ts";

const api = new Api();

const register = async (username, password) =>{
    const res = await api.accounts.accountsLoginCreate(
        {headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRFToken': document.cookie.match(/csrftoken=([w-]+)/)

            },
            body: JSON.stringify({username, password})
        }
    )
        .then((response) => {
            return console.log(response)
        }).catch(()=>{
            return {count:0, results:[]}
        })
    return res
}

export default function Register (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Register">
            <Form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <Form.Group className={"username"} controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"password"} controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"repassword"} controlId="repassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className={'LoginButton'} block="true" variant={"dark"} size="lg" type="submit" disabled={!validateForm()}>
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
}