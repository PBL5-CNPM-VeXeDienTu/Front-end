import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const GuestRoute = () => {
    const token = localStorage.getItem('token')

    return token !== 'null' ? <Navigate to={'/profile'} /> : <Outlet />
}

GuestRoute.defaultProps = {
    location: {},
}

export default GuestRoute
