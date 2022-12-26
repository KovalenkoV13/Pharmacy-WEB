import React, { useState, useEffect } from 'react';
import { Api } from "../components/api/pharmacyApi.ts";
import axios from "axios";
import Cookies from "js-cookie";


const api = new Api();

// const csrf = async () =>{
//      await api.accounts.accountsCsrfCookieList({credentials:'include'})
// }

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');
        useEffect(() => {
            const fetchData = async () => {
                await axios.get(`http://127.0.0.1:8000/accounts/csrf_cookie`, {withCredentials: true});

            };


            fetchData()
            setcsrftoken(getCookie('csrftoken'));

        }, []);


    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;