import axiosClient from 'api/axiosClient'
import { useNavigate } from 'react-router-dom'
import { createContext, useState, useEffect, useMemo } from 'react'
import auth from 'api/auth'

const UserContext = createContext({})

export const roles = {
    BASIC_USER: 1,
    PARKING_LOT_USER: 2,
    ADMIN: 3,
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem('collapsed') === 'true',
    )

    const providerValue = useMemo(
        () => ({ token, setToken, user, setUser, collapsed, setCollapsed }),
        [token, setToken, user, setUser, collapsed, setCollapsed],
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (token !== 'null') {
            // Set authenticate token to axios
            axiosClient.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            // Get current user's data
            auth.getAuthenticatedUser()
                .then((response) => {
                    setUser(response.data)
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    localStorage.setItem('role', response.data.role)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            // User logout
            localStorage.setItem('token', null)
            localStorage.setItem('user', null)
            localStorage.setItem('role', null)
            navigate('/login')
        }
    }, [token, navigate])

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
