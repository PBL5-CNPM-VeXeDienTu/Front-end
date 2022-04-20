import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from 'components/layouts/MainLayout'
import loadableComponent from 'components/loadable-component'
import AuthenticatedRoute from './authenticated-route'
import GuestRoute from './guest-route'

const Login = loadableComponent(() => import('views/pages/login'))
const Register = loadableComponent(() => import('views/pages/register'))
const Profile = loadableComponent(() => import('views/pages/profile'))
const EditVehicle = loadableComponent(() =>
    import('views/pages/vehicles/edit-vehicle'),
)
const AddVehicle = loadableComponent(() =>
    import('views/pages/vehicles/add-vehicle'),
)
const ChangePassword = loadableComponent(() =>
    import('views/pages/change-password'),
)

const availableRoles = [0, 1, 2]
// const BASIC_USER_ROLE = 0;
// const PARKING_LOT_USER_ROLE = 1;
// const ADMIN_ROLE = 2;

function AllRoutes() {
    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route
                element={<AuthenticatedRoute acceptedRoles={availableRoles} />}
            >
                <Route
                    path="/profile"
                    element={<MainLayout component={Profile} />}
                />
                <Route
                    path="/change-password"
                    element={<MainLayout component={ChangePassword} />}
                />
                <Route
                    path="/vehicles/edit"
                    element={<MainLayout component={EditVehicle} />}
                />
                <Route
                    path="/vehicles/add"
                    element={<MainLayout component={AddVehicle} />}
                />
            </Route>
        </Routes>
    )
}
export default AllRoutes
