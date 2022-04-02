import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.min.css';
import './index.css';

import App from './App';
import { Route, Router } from 'react-router-dom';
import { BrowserRouter, Link } from "react-router-dom";
import Header from 'components/header';
import Login from 'views/pages/login';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
