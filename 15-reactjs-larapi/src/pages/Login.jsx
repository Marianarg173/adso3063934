import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            // ALERTA DE LOGIN EXITOSO
            Swal.fire({
                title: "Bienvenido 🐶",
                text: "Login exitoso",
                icon: "success",
                draggable: true
            }).then(() => {
                navigate("/dashboard");
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Credenciales incorrectas."
            });

        }
    };

    return (
        <main id="login" className="animateView">
            <header>
                <img src="/imgs/title-login.png" alt="Logo" />
            </header>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Your Secret Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btnLogin">
                    Login
                </button>
            </form>
        </main>
    );
}

export default Login;