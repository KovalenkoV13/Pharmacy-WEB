import React, {createContext, useEffect, useReducer} from "react";
import axios from "axios";
import product from "../pages/product";

export const Context = createContext();
export const initialState = {
    product: [],
    isLogIn: false
};

export const Reducer = (state, action) => {
    switch (action.type){
        case 'PRODUCT':
            return {
                product: [...action.payload,...state.product],
                isLogIn: state.isLogIn
            };
        case 'LOGIN':
            return {
                isLogIn: true,
                product: state.product
            };
        case 'LOGOUT':
            return {
                isLogIn: false,
                product: []
            };
    };
};

