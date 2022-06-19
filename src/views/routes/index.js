import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
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

const DetailVehicle = loadableComponent(() =>
    import('views/pages/vehicle-list/detail'),
)

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
const ParkingHistories = loadableComponent(() =>
    import('views/pages/parking-history-list'),
)

const Wallets = loadableComponent(() => import('views/pages/wallet-list'))

const DetailWallet = loadableComponent(() =>
    import('views/pages/wallet-list/detail'),
)

const Payment = loadableComponent(() =>
    import('views/pages/wallet-list/payment'),
)

const QrCheckout = loadableComponent(() => import('views/pages/qr-checkout'))

const Packages = loadableComponent(() => import('views/pages/package-list'))

const AddPackage = loadableComponent(() =>
    import('views/pages/package-list/add'),
)

const EditPackage = loadableComponent(() =>
    import('views/pages/package-list/edit'),
)

const Accounts = loadableComponent(() => import('views/pages/account-list'))

const AddAccount = loadableComponent(() =>
    import('views/pages/account-list/add'),
)

const VerifyRequest = loadableComponent(() =>
    import('views/pages/verify-request'),
)
const CheckinCheckout = loadableComponent(() =>
    import('views/pages/checkin-checkout'),
)
const Setting = loadableComponent(() => import('views/pages/setting'))
const NotFound = loadableComponent(() => import('views/pages/404-not-found'))
const availableRoles = [1, 2, 3]

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />

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
                    path="/profile/:id"
                    element={<MainLayout component={Profile} />}
                />
                <Route
                    path="/profile/:id/edit"
                    element={<MainLayout component={EditProfile} />}
                />
                <Route
                    path="/vehicles"
                    element={<MainLayout component={Vehicles} />}
                />
                <Route
                    path="/vehicles/:id"
                    element={<MainLayout component={DetailVehicle} />}
                />
                <Route
                    path="/vehicles/:id/edit"
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
                    path="/parking-lots/add"
                    element={<MainLayout component={AddParkingLot} />}
                />
                <Route
                    path="/parking-lots/:id"
                    element={<MainLayout component={DetailParkingLot} />}
                />
                <Route
                    path="/parking-lots/:id/edit"
                    element={<MainLayout component={EditParkingLot} />}
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
                    path="/qr-checkout"
                    element={<MainLayout component={QrCheckout} />}
                />
                <Route
                    path="/parking-histories"
                    element={<MainLayout component={ParkingHistories} />}
                />
                <Route
                    path="/setting"
                    element={<MainLayout component={Setting} />}
                />
                <Route
                    path="/wallets"
                    element={<MainLayout component={Wallets} />}
                />
                <Route
                    path="/wallets/:id/detail"
                    element={<MainLayout component={DetailWallet} />}
                />
                <Route
                    path="/wallets/payment"
                    element={<MainLayout component={Payment} />}
                />
                <Route
                    path="/packages"
                    element={<MainLayout component={Packages} />}
                />
                <Route
                    path="parking-lots/:id/packages"
                    element={<MainLayout component={Packages} />}
                />
                <Route
                    path="/packages/add"
                    element={<MainLayout component={AddPackage} />}
                />
                <Route
                    path="/packages/:id/edit"
                    element={<MainLayout component={EditPackage} />}
                />
                <Route
                    path="/accounts"
                    element={<MainLayout component={Accounts} />}
                />
                <Route
                    path="/accounts/add"
                    element={<MainLayout component={AddAccount} />}
                />
                <Route
                    path="/verify-request"
                    element={<MainLayout component={VerifyRequest} />}
                />
                <Route
                    path="/checkin-checkout"
                    element={<MainLayout component={CheckinCheckout} />}
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
export default AllRoutes
