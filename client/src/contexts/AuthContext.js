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
        store: null,
    });

    const uploadImage = (file) => {
        let formData = new FormData();
        formData.append("photo", file);
        return axios.post(`${apiUrl}/images/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const deleteImage = (path) => {
        return axios.post(`${apiUrl}/images/delete`, { path: path });
    };

    // Get store
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
                            store: response.data.store,
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
                    payload: { isAuthenticated: false, store: null },
                });
            });
    };

    useEffect(() => loadStore(), []);

    // Login store
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

    // Register store
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

    // Update store
    const updateStore = async (updatedStore) => {
        try {
            const response = await axios.put(
                `${apiUrl}/auth/store/${updatedStore._id}`,
                updatedStore
            );
            if (response.data.success) {
                dispatch({
                    type: "UPDATE_STORE",
                    payload: response.data.store,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
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
        updateStore,
        logoutStore,
        uploadImage,
        deleteImage,
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
