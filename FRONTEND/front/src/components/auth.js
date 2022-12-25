import Cookies from 'js-cookie';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from './reducer';
import axios from "axios";

export const checkAuthenticated = async () => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/accounts/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            return  AUTHENTICATED_FAIL
        }
        else if (res.data.isAuthenticated === 'success') {
            return AUTHENTICATED_SUCCESS
        }
        else {
            return  AUTHENTICATED_FAIL
        }
    } catch(err) {
        return  AUTHENTICATED_FAIL
    }
};

export const login = async (username, password) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/login`, body, config);

        if (res.data.success) {
            return {type: LOGIN_SUCCESS, payload: res.data.userProfileId}
        } else {
            return LOGIN_FAIL
        }
    } catch(err) {
        return LOGIN_FAIL
    }
};

export const register = async(username, password, re_password) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    console.log("Body", body)
    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/register`, body, config);
        if (res.data.error) {
            console.log("REGISTER_FAIL")
            return REGISTER_FAIL
        } else {
            console.log("REGISTER_SUCCESS")
            return REGISTER_SUCCESS
        }
    } catch (err) {
        console.log("Error", err)
        return REGISTER_FAIL
    }
};

export const logout = async ()  => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/logout`, body, config);

        if (res.data.success) {
            return LOGOUT_SUCCESS
        } else {
            return LOGOUT_FAIL
        }
    } catch(err) {
        return LOGOUT_FAIL
    }
};