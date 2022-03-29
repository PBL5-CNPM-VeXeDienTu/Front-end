import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from 'pages/login';
import Register from 'pages/register';

const AllRoutes = () => {
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
    </Routes>;
};

export default AllRoutes;
