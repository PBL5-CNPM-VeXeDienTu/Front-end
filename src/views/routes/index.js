import React from 'react';
import MainLayout from 'components/layouts/MainLayout'
import { BrowserRouter, Routes, Route, Router, Switch } from 'react-router-dom'
import Header from 'components/header';
import Profile from 'views/pages/profile';
import Login from 'views/pages/login';
import Register from 'views/pages/register';
function AllRoutes() {
    return (
        <Routes>
            <Route path="/login" element={  <MainLayout component={Login}/> } />
            <Route path="/profile" element={  <MainLayout component={Profile}/> } />
        </Routes>
       

    )
};
export default AllRoutes;