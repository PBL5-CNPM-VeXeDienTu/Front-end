import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const GuestRoute = () => {
    const { user, token } = useAuth()
    return token !== 'null' ? (
        <Navigate to={`/profile/${user?.id}`} />
    ) : (
        <Outlet />
    )
}

GuestRoute.defaultProps = {
    location: {},
}

export default GuestRoute
