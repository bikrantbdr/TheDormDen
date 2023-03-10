import React, { createContext, useReducer } from "react"

const INITIAL_STATE = {
    display: false,
    status: null,
    message: "Do you want to verify",
    purpose: "warning"
}

export const PromptContext = createContext(INITIAL_STATE)

const PromptReducer = (state, action) => {
    switch (action.type) {
        case "PROMPT_START":
            return {
                display: true,
                status: null,
                message: action.payload.message,
                purpose: action.payload.purpose
            }
        case "PROMPT_SUCCESS":
            return {
                display: true,
                status: action.payload.status,
                message: action.payload.message,
                purpose: action.payload.purpose
            }
        case "PROMPT_END":
            return {
                display: false,
                status: null,
                message: null,
                purpose: null
            }
        default:
            return state
    }
}

export const PromptContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PromptReducer, INITIAL_STATE)

    return (
        <PromptContext.Provider
            value={{ display: state.display, status: state.status, message: state.message, purpose: state.purpose, dispatch }}>
            {children}
        </PromptContext.Provider>
    )
}

