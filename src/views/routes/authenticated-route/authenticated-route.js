import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const ADMIN_ROLE = 2

const AuthenticatedRoute = ({
    component: Component,
    render: Render,
    ...rest
}) => {
    if (!Object.keys(rest.user).length) {
        return (
            <Navigate
                to={{ pathname: '/login', state: { from: rest.location } }}
            />
        )
    }

    const userRole = rest.user.role
    const adminRedirect =
        userRole === ADMIN_ROLE && rest.location.pathname === '/'

    if (adminRedirect) {
        return <Navigate to={{ pathname: '/admins' }} />
    }

    if (Component) {
        return rest.acceptedRoles.includes(userRole) ? (
            <Route
                {...rest}
                element={(props) => <Component role={userRole} {...props} />}
            />
        ) : (
            <div>403</div>
        )
    }

    return rest.acceptedRoles.includes(userRole) ? (
        <Route {...rest} render={Render} />
    ) : (
        <div>403</div>
    )
}

AuthenticatedRoute.defaultProps = {
    location: {},
    render: () => {},
}

export default AuthenticatedRoute
