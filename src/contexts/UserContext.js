import axiosClient from 'api/axiosClient'
import { useNavigate } from 'react-router-dom'
import { createContext, useState, useEffect, useMemo } from 'react'
import auth from 'api/auth'

const UserContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState({})
    const providerValue = useMemo(
        () => ({ user, setUser, token, setToken }),
        [user, setUser, token, setToken],
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            // Set authenticate token to axios
            axiosClient.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            // Get current user's data
            auth.getAuthenticatedUser()
                .then((response) => {
                    setUser(response.data)
                    localStorage.setItem('role', response.data.role)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            // User logout
            setUser({})
            localStorage.setItem('token', null)
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
