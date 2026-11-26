
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

    // User ka data store karne ke liye
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Page open hote hi profile API call hogi
    useEffect(() => {

        const getProfile = async () => {

            try {

                // Backend ko request bhejo
                const res = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    {
                        // Browser automatically cookie send karega
                        withCredentials: true
                    }
                );

                // Backend se user ka data receive karo
                setUser(res.data.user);

            } catch (error) {

                // Agar login nahi hai ya token invalid hai
                alert("Please Login First");

                // Login page par bhej do
                navigate("/login");

            }
        };

        // Function call karo
        getProfile();

    }, []);

    // LOGOUT FUNCTION
    const handleLogout = async () => {

        try {

            // Backend logout API call karo
            const res = await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            );

            // Logout message show karo
            alert(res.data.message);

            // Login page par bhej do
            navigate("/login");

        } catch (error) {

            alert("Logout failed");

        }
    };

    return (

        <div className="container">

            <h2>My Profile</h2>

            {/* Jab user ka data available ho tab show karo */}
            {user && (
                <>

                    <h3>Welcome!</h3>

                    {/* User ki ID show karo */}
                    <p>User ID: {user.id}</p>

                    {/* User ka role show karo */}
                    <p>Role: {user.role}</p>

                </>
            )}

            {/* Logout button */}
            <button onClick={handleLogout}>
                Logout
            </button>

        </div>

    );
}

export default Profile;
