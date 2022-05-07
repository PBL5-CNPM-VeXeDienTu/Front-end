import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'contexts/UserContext'
import AllRoutes from 'views/routes'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AllRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
