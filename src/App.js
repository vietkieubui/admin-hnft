import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard.js";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthContextProvider from "./contexts/AuthContext";
import Landing from "./components/Landing.js";
import Auth from "./components/auth/Auth.js";

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route
                    path="/register"
                    element={<Auth authRoute="register" />}
                />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
