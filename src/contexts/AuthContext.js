import React, { useState, createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Authenticate user
    // const loadUser = async () => {
    //     if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    //         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    //     }

    //     try {
    //         const response = await axios.get(`${apiUrl}/auth`);
    //         if (response.data.success) {
    //             dispatch({
    //                 type: "SET_AUTH",
    //                 payload: {
    //                     isAuthenticated: true,
    //                     user: response.data.user,
    //                 },
    //             });
    //         }
    //     } catch (error) {
    //         localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //         setAuthToken(null);
    //         dispatch({
    //             type: "SET_AUTH",
    //             payload: { isAuthenticated: false, user: null },
    //         });
    //     }
    // };

    const loadUser = () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        axios
            .get(`${apiUrl}/auth/store`)
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: {
                            isAuthenticated: true,
                            user: response.data.user,
                        },
                    });
                }
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);

                dispatch({
                    type: "SET_AUTH",
                    payload: { isAuthenticated: false, user: null },
                });
            });
    };

    useEffect(() => loadUser(), []);

    // Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/store/login`,
                userForm
            );
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );

            // await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Register
    // const registerUser = async userForm => {
    // 	try {
    // 		const response = await axios.post(`${apiUrl}/auth/register`, userForm)
    // 		if (response.data.success)
    // 			localStorage.setItem(
    // 				LOCAL_STORAGE_TOKEN_NAME,
    // 				response.data.accessToken
    // 			)

    // 		await loadUser()

    // 		return response.data
    // 	} catch (error) {
    // 		if (error.response.data) return error.response.data
    // 		else return { success: false, message: error.message }
    // 	}
    // }

    // const [username, setUsername] = useState("admin");
    // const [password, setPassword] = useState("abc");

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const loginSuccess = () => {
    //     setIsLoggedIn(!isLoggedIn);
    // };

    // const changePassword = ({ newpass }) => {
    //     setPassword(newpass);
    // };

    // const authContextData = {
    //     username,
    //     setUsername,
    //     password,
    //     setPassword,
    //     isLoggedIn,
    //     setIsLoggedIn,
    //     loginSuccess,
    //     changePassword,
    // };

    // return (
    //     <AuthContext.Provider value={authContextData}>
    //         {children}
    //     </AuthContext.Provider>
    // );

    // Context data
    const authContextData = { loginUser, authState };

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
