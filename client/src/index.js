import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from "./context/AuthContext";
import {NotificationContextProvider} from "./context/NotificationContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <NotificationContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </NotificationContextProvider>
    </AuthContextProvider>
);
