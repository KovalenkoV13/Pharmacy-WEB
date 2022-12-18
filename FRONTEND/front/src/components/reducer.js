import React, {createContext, useEffect, useReducer} from "react";

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
                isLogIn: state.isLogIn,
            };
        case 'DELETE_PRODUCT':
            return {
                product: state.product.filter(item => item.name !== action.payload),
                isLogIn: state.isLogIn,
            };
        case 'LOGIN':
            return {
                isLogIn: true,
                product: state.product,
            };
        case 'LOGOUT':
            return {
                isLogIn: false,
                product: []
            };
    };
};

