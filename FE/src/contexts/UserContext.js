// src/contexts/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // localStorage.removeItem('token');
    const [user, setUser] = useState(localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          return;
        }
        
        setUser(JSON.parse(localStorage.getItem('token')));
      }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
