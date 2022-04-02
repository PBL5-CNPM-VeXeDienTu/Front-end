import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ADMIN_ROUTE = 2;

const AuthenticatedRoute = ({component: Component, render: Render, ...rest}) => {
    if (!Object.keys(rest.user).length) {
        return <Navigate to={{ pathname: '/login', state: { from: rest.location }}} />;
    }

    const userRole = rest.user.role;
    const adminRedirect = userRole === ADMIN_ROUTE && rest.location.pathname === '/';

    if (adminRedirect) {
        return <Navigate to={{ pathname: '/admins'}} />;
    }

    if (Component) {
        return (rest.acceptedRoles.includes(userRole))
            ? (
                <Route {...rest} render={props => <Component role={rest.user.role} {...props} />} />
            )
            : (
                <div>403</div>
            );
    }

    return (rest.acceptedRoles.includes(userRole))
        ? (
            <Route {...rest} render={Render} />
        )
        : (
            <div>403</div>
        );
};

AuthenticatedRoute.defaultProps = {
    location: {},
    render: () => {}
};

export default AuthenticatedRoute;
