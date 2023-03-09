<<<<<<< HEAD
import React, { createContext, useReducer } from "react"

const INITIAL_STATE = {
    display: false,
    status: null,
    message: null
}

export const NotificationContext = createContext(INITIAL_STATE)

const NotificationReducer = (state, action) => {
    switch (action.type) {
        case "NOTIFICATION_START":
            return {
                display: true,
                status: action.payload.status,
                message: action.payload.message
            }
        case "NOTIFICATION_END":
            return {
                display: false,
                status: null,
                message: null
            }
        default:
            return state
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE)

    return (
        <NotificationContext.Provider
            value={{ display: state.display, status: state.status, message: state.message, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

=======
import React, { createContext, useReducer } from "react"

const INITIAL_STATE = {
    display: false,
    status: null,
    message: null
}

export const NotificationContext = createContext(INITIAL_STATE)

const NotificationReducer = (state, action) => {
    switch (action.type) {
        case "NOTIFICATION_START":
            return {
                display: true,
                status: action.payload.status,
                message: action.payload.message
            }
        case "NOTIFICATION_END":
            return {
                display: false,
                status: null,
                message: null
            }
        default:
            return state
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE)

    return (
        <NotificationContext.Provider
            value={{ display: state.display, status: state.status, message: state.message, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
