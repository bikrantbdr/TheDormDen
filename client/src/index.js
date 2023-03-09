import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(APP);
