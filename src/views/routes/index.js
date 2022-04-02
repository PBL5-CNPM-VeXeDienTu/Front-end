import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import loadableComponent from 'components/loadable-component';
import { UserContext } from 'hooks/UserContext';

const Login = loadableComponent(() => import('views/pages/login'));
const Register = loadableComponent(() => import('views/pages/register'));
const Profile = loadableComponent(() => import('views/pages/profile'));

function AllRoutes() {
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/profile"
                element={<MainLayout component={Profile} />}
            />
        </Routes>
    );
}
export default AllRoutes;
