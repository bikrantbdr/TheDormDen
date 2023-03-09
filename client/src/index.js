import React from 'react';
import { hydrate, render } from "react-dom";
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from "./context/AuthContext";
import {NotificationContextProvider} from "./context/NotificationContext";
import {PromptContextProvider} from "./context/PromptContext";

const APP =(
    <AuthContextProvider>
        <NotificationContextProvider>
            <PromptContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PromptContextProvider>
        </NotificationContextProvider>
    </AuthContextProvider>
)

const root = document.getElementById("root");

if (root.hasChildNodes()) {
    hydrate(APP, root);
} else {
    render(APP, root);
}
