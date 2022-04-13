import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import loadableComponent from 'components/loadable-component';
import useAuth from 'hooks/useAuth';

const Login = loadableComponent(() => import('views/pages/login'));
const Register = loadableComponent(() => import('views/pages/register'));
const Profile = loadableComponent(() => import('views/pages/profile'));
const ChangePassword = loadableComponent(() =>
    import('views/pages/change-password'),
);

// const availableRoles = [0, 1, 2];
// const BASIC_USER_ROLE = 1;
// const PARKING_LOT_USER_ROLE = 2;
// const ADMIN_ROLE = 3;

function AllRoutes() {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/profile"
                element={<MainLayout component={Profile} />}
            />
            <Route
                path="/change-password"
                element={<MainLayout component={ChangePassword} />}
            />
            {/* <AuthenticatedRoute
                path="/profile"
                acceptedRoles={availableRoles}
                component={Profile}
            /> */}
        </Routes>
    );
}
export default AllRoutes;
