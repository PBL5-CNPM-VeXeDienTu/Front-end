import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

import * as roles from 'shared/constants/role'

const GuestRoute = () => {
    const { user, token } = useAuth()
    
    if (token !== 'null' && user) {
        localStorage.setItem('selected_sidebar_key', 1)
        switch (user.role) {
            case roles.PARKING_USER:
                return <Navigate to={'/vehicles'} />
            case roles.PARKING_LOT_USER:
                return <Navigate to={'/parking-lots'} />
            case roles.ADMIN:
                return <Navigate to={'/accounts'} />
            default:
                return <Navigate to={`/profile/${user.id}`} />
        }
    }
    
    return <Outlet />
}

GuestRoute.defaultProps = {
    location: {},
}

export default GuestRoute
