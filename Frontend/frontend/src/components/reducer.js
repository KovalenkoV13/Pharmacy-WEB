import React, {createContext, useEffect, useReducer} from "react";
import axios from "axios";

export const Context = createContext(null);
export const initialState = {
    error : '',
    dataCat: [],
    dataGoods : [],
    dataCatGood: []
};

export const Reducer = (state, action) => {
    switch (action.type){
        case 'FETCH_GOODS_SUCCESS':
            return {
                dataGoods : action.payload,
                dataCat: state,
                error: ''
            };
        case 'FETCH_CAT_SUCCESS':
            return {
                dataCat : action.payload,
                error: ''
            };

        case 'FETCH_GOOD_CAT':
            return {
                dataCatGood: action.payload
            }

        case 'FETCH_ERROR':
            return {
                error: action.error
            };
    };
};


export function fetchGood(){
    return axios.get('http://127.0.0.1:8000/api/good/');
};

export function fetchGood_1(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=1');
};
export function fetchGoodCat(idCat){
    return axios.get(`http://127.0.0.1:8000/api/good/?id_cat_id=${idCat}`);
};

export function fetchGood_3(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=3');
};

export function fetchGood_4(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=4');
};

export function fetchGood_5(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=5');
};

export function fetchGood_6(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=6');
};

export function fetchGood_7(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=7');
};

export function fetchGood_8(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=8');
};

export function fetchGood_9(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=9');
};

export function fetchGood_10(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=10');
};

export function fetchGood_11(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=11');
};

export function fetchGood_12(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=12');
};

export function fetchGood_13(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=13');
};

export function fetchGood_14(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=14');
};
export function fetchGood_15(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=15');

};export function fetchGood_16(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=16');
};

export function fetchGood_17(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=17');
};

export function fetchGood_18(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=18');
};

export function fetchGood_19(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=19');
};

export function fetchGood_20(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=20');
};

export function fetchGood_21(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=21');
};

export function fetchGood_22(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=22');
};

export function fetchGood_23(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=23');
};
export function fetchGood_24(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=24');
};
export function fetchGood_25(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=25');
};
export function fetchGood_26(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=26');
};
export function fetchGood_27(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=27');
};
export function fetchGood_28(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=28');
};
export function fetchGood_29(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=29');
};
export function fetchGood_30(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=30');
};
export function fetchGood_31(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=31');
};
export function fetchGood_32(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=32');
};
export function fetchGood_33(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=33');
};
export function fetchGood_34(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=34');
};
export function fetchGood_35(){
    return axios.get('http://127.0.0.1:8000/api/good/?id_cat_id=35');
};

export function fetchCat() {
    return axios.get('http://127.0.0.1:8000/api/category');
};

