import { createContext, useState, useMemo } from 'react';

const UserContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
