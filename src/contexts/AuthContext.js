import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("abc");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginSuccess = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const changePassword = ({ newpass }) => {
    setPassword(newpass);
  };

  const authContextData = {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
    loginSuccess,
    changePassword,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
