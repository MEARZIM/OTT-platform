import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, { withCredentials: true })
            .then((response) => setUser(response.data))
            .catch(() => navigate("/"));
    }, [navigate]);

    return user ? (
        <div>
            <h1>Welcome, {user.name}</h1>
            <img src={user.profileImage} alt="Profile" width="100" />
            <button onClick={() => (window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)}>
                Logout
            </button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Dashboard;
