import React, { createContext, useCallback, useState } from "react";


// // create the context
export const MyContext = createContext();


const CTXProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();


  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
  };

  const logout = async() => {
    setIsLoggedIn(false);
    setUser(null);
    const response = await fetch(process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/logout", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
  };

  const updateUsershelves = (updatedShelves) => {
    setUser((prevState)=> {
      return {...prevState, shelves: updatedShelves }
    })
  }

  const value = {
    isLoggedIn,
    login,
    logout,
    user,
    updateUsershelves
  };

  // pass down the state and update function to children
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default CTXProvider;
