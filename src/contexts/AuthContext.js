import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const loadStore = () => {
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
                // console.log(response.data);
            })
            .catch(function (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);

                dispatch({
                    type: "SET_AUTH",
                    payload: { isAuthenticated: false, user: null },
                });
            });
    };

    useEffect(() => loadStore(), []);

    // Login
    const loginStore = async (storeForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/store/login`,
                storeForm
            );
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );

            loadStore();

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Register
    const registerStore = async (storeForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/store/register`,
                storeForm
            );

            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );

            loadStore();

            // return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Logout
    const logoutStore = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: false, user: null },
        });
    };

    // Context data
    const authContextData = {
        loginStore,
        registerStore,
        logoutStore,
        authState,
    };

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
