import React, { useState, createContext } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const signup = (user) => {
        setCurrentUser(user);
    };
    
    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };
    
    return (
        <UserContext.Provider value={{currentUser, login, signup, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
