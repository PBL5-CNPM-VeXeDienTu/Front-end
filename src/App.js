import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'contexts/UserContext'
import AllRoutes from 'views/routes'

function App() {
    useEffect(() => {
        if (!localStorage.getItem('collapsed')) {
            localStorage.setItem('collapsed', false)
        }
    }, [])

    return (
        <BrowserRouter>
            <AuthProvider>
                <AllRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
