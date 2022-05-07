import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from 'components/layouts/MainLayout'
import loadableComponent from 'components/loadable-component'
import AuthenticatedRoute from './authenticated-route'
import GuestRoute from './guest-route'

const Login = loadableComponent(() => import('views/pages/login'))
const Register = loadableComponent(() => import('views/pages/register'))
const Profile = loadableComponent(() => import('views/pages/profile'))
const EditProfile = loadableComponent(() =>
    import('views/pages/profile/edit-profile'),
)
const ChangePassword = loadableComponent(() =>
    import('views/pages/change-password'),
)
const Vehicles = loadableComponent(() => import('views/pages/vehicle-list'))
const EditVehicle = loadableComponent(() =>
    import('views/pages/vehicle-list/edit'),
)
const AddVehicle = loadableComponent(() =>
    import('views/pages/vehicle-list/add'),
)
const ParkingLots = loadableComponent(() =>
    import('views/pages/parking-lot-list'),
)

const DetailParkingLot = loadableComponent(() =>
    import('views/pages/parking-lot-list/detail'),
)

const EditParkingLot = loadableComponent(() =>
    import('views/pages/parking-lot-list/edit'),
)

const AddParkingLot = loadableComponent(() =>
    import('views/pages/parking-lot-list/add'),
)
const Feedbacks = loadableComponent(() => import('views/pages/feedback-list'))
const AddFeedback = loadableComponent(() =>
    import('views/pages/feedback-list/add'),
)

const WalletsList = loadableComponent(() => import('views/pages/wallet-list'))

const Payment = loadableComponent(() =>
    import('views/pages/wallet-list/payment'),
)

const availableRoles = [1, 2, 3]
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
                    path="/change-password"
                    element={<MainLayout component={ChangePassword} />}
                />
                <Route
                    path="/profile"
                    element={<MainLayout component={Profile} />}
                />
                <Route
                    path="/profile/edit"
                    element={<MainLayout component={EditProfile} />}
                />
                <Route
                    path="/vehicles"
                    element={<MainLayout component={Vehicles} />}
                />
                <Route
                    path="/vehicles/edit"
                    element={<MainLayout component={EditVehicle} />}
                />
                <Route
                    path="/vehicles/add"
                    element={<MainLayout component={AddVehicle} />}
                />
                <Route
                    path="/parking-lots"
                    element={<MainLayout component={ParkingLots} />}
                />
                <Route
                    path="/parking-lots/detail"
                    element={<MainLayout component={DetailParkingLot} />}
                />
                <Route
                    path="/parking-lots/edit"
                    element={<MainLayout component={EditParkingLot} />}
                />
                <Route
                    path="/parking-lots/add"
                    element={<MainLayout component={AddParkingLot} />}
                />
                <Route
                    path="/feedbacks"
                    element={<MainLayout component={Feedbacks} />}
                />
                <Route
                    path="/feedbacks/add"
                    element={<MainLayout component={AddFeedback} />}
                />
                <Route
                    path="/wallets"
                    element={<MainLayout component={WalletsList} />}
                />
                <Route
                    path="/wallets/payment"
                    element={<MainLayout component={Payment} />}
                />
            </Route>
        </Routes>
    )
}
export default AllRoutes
