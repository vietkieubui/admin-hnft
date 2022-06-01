import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth.js";
import ProtectedRoute from "./components/routing/ProtectedRoute.js";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route path="/dashboard" element={<ProtectedRoute />} />
        </Routes>
    );
}

export default App;
