import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticatedRoute = ({ ...rest }) => {
    const userRole = parseInt(localStorage.getItem('role'))

    if (userRole) {
        return rest.acceptedRoles.includes(userRole) ? (
            <Outlet />
        ) : (
            <Navigate to="/404" />
        )
    } else {
        return <Navigate to="/login" />
    }
}

export default AuthenticatedRoute
