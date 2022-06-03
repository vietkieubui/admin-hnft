import { Spin } from "antd";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DashBoard2 from "../DashBoard2";

const ProtectedRoute = () => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    return authLoading ? (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spin />
        </div>
    ) : isAuthenticated ? (
        <DashBoard2 />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
