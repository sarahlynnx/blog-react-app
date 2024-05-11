import React, { useState, createContext, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    const signup = (user) => {
        setCurrentUser(user);
    };
    
    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };
    
    return (
        <UserContext.Provider value={{currentUser, login, signup, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
