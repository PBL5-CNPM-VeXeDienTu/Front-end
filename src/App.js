import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'hooks/UserContext';
import AllRoutes from 'views/routes';

function App() {
    const [ user, setUser ] = useState('User datas'); 
    const providerValue = useMemo(() => ({ user, setUser }), [ user, setUser ]);

    return (
        <BrowserRouter>
            <UserContext.Provider value={providerValue}>
                <AllRoutes />
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
