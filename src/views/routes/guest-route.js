import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const GuestRoute = () => {
    const { token } = useAuth()
    return token !== 'null' ? <Navigate to={'/profile'} /> : <Outlet />
}

GuestRoute.defaultProps = {
    location: {},
}

export default GuestRoute
