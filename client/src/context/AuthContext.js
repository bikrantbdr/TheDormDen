import React, { createContext, useReducer, useEffect } from "react"
import Cookies from "js-cookie"

const INITIAL_STATE = {
    user_id: Cookies.get("user_id") || null ,
    username: Cookies.get("username") || null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user_id: null ,
                username: null,
                token: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user_id: action.payload.user_id ,
                username: action.payload.username,
                token: action.payload.token,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user_id: null,
                username: null,
                token: null,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        Cookies.set("user_id", state.user_id)
        Cookies.set("username", state.username)
        Cookies.set("token", state.token)
    })

    return (
        <AuthContext.Provider
            value={{ user_id: state.user_id, username: state.username, token: state.token, loading: state.loading, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

