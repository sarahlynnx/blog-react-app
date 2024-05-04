import React, { useState, createContext } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };
    
    return (
        <UserContext.Provider value={{currentUser, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
