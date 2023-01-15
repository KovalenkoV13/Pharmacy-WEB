import React, {createContext, useEffect, useReducer} from "react";

export const defaultState = {
    isAuthenticated: false
}
export const Context = createContext(defaultState);

export const
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAIL = "LOGIN_FAIL",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_FAIL = "LOGOUT_FAIL",
    AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS",
    AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL"

export const Reducer = (state, action) => {
    const { type, payload } = action
    switch (type){
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            console.log("REGISTER_SUCCESS")
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS ID", payload)
            return {
                ...state,
                id: payload.id,
                isAuthenticated: true,
                isManager: payload.isManager
            }
        case LOGIN_FAIL:
            console.log("LOGIN_SUCCESS ID", payload)
            return {
                isAuthenticated: false
            }
    };
};

