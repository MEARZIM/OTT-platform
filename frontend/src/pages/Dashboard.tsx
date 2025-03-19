import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const { email } = useParams<{ email: string }>();
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate("/"); // Redirect if no email
            return;
        }
        
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/email/${email}`, { withCredentials: true }) 
            .then((response) => setUser(response.data))
            .catch(() => navigate("/"));
        
    }, [email, navigate]);
    console.log(user);

    
    return user ? (
        <div>
            <h1>Welcome, {user.name}</h1>
            <img src={user.profileImage} alt="Profile" width="100"  referrerPolicy="no-referrer"/>
            <button onClick={() => (window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)}>
                Logout
            </button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Dashboard;
