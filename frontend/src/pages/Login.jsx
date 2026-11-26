
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// Link ka use tab karte hain jab user khud click karke doosre page par jana chahta ho.
// useNavigate ka use tab karte hain jab hum code ke through automatically page change karwana chahte hain.

function Login() {

    // Email store karne ke liye state
    const [email, setEmail] = useState("");

    // Password store karne ke liye state
    const [password, setPassword] = useState("");

    // Login ke baad doosre page par jane ke liye
    const navigate = useNavigate();

    // Login button click hone par function chalega
    const handleLogin = async (e) => {

        // Form reload hone se rokta hai
        e.preventDefault();

        try {

            // Backend Login API ko email aur password send karo
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password },
                {
                    // Browser ko cookies send aur receive karne do
                    withCredentials: true
                }
            );

            // Login successful hone par message show karo
            alert("Login Successful");

            // User ko Profile page par bhejo
            navigate("/profile");

        } catch (error) {

            // Login fail hone par backend ka error message show karo
            alert(error.response?.data?.message || "Login failed");

        }
    };

    return (

        <div className="container">

            {/* Login form */}
            <form onSubmit={handleLogin}>

                <h2>Login Account</h2>

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

                {/* Login button */}
                <button type="submit">Login</button>

                {/* Register page ka link */}
                <p>
                    New user? <Link to="/">Register</Link>
                </p>

            </form>

        </div>
    );
}

// Login component export karo
export default Login;
