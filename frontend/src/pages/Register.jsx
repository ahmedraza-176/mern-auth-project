
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    // User ka name store karne ke liye
    const [name, setName] = useState("");

    // User ki email store karne ke liye
    const [email, setEmail] = useState("");

    // User ka password store karne ke liye
    const [password, setPassword] = useState("");

    // Page change karne ke liye
    const navigate = useNavigate();

    // Register button click hone par ye function chalega
    const handleRegister = async (e) => {

        // Form submit hone par page reload nahi hoga
        e.preventDefault();

        try {

            // Backend API ko data send karo
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            // Backend ka success message show karo
            alert(res.data.message);

            // Register ke baad Login page par bhejo
            navigate("/login");

        } catch (error) {

            // Agar error aaye toh error message show karo
            alert(error.response?.data?.message || "Register failed");

        }
    };

    return (

        <div className="container">

            {/* Register form */}
            <form onSubmit={handleRegister}>

                <h2>Create Account</h2>

                {/* Name input */}
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Email input */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Register button */}
                <button type="submit">
                    Register
                </button>

                {/* Login page ka link */}
                <p>
                    Already have account? <Link to="/login">Login</Link>
                </p>

            </form>

        </div>

    );
}

// Register component export karo
export default Register;
