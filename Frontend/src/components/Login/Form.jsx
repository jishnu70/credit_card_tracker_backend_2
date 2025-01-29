import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Api/constants";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../MenuContext/AccountContext"; // Import useAccount
import "./Form.css";

const AuthSwitch = ({ method, navigate }) => (
    <div className="auth-switch">
        <p>{method === "Login" ? "Don't have an account?" : "Already have an account?"}</p>
        <button onClick={() => navigate(method === "Login" ? "/register" : "/login")}>
            {method === "Login" ? "Register" : "Login"}
        </button>
    </div>
);

function Form({ route, method }) {
    const navigate = useNavigate();
    const { handleLogin } = useAccount(); // Destructure handleLogin from useAccount
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password1: "",
        password2: "",
        mobileNo: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (method === "Login") {
                const res = await api.post("/api/token/obtain/", {
                    username: formData.username,
                    password: formData.password1
                });

                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    handleLogin(); // Call handleLogin after successful login
                    navigate("/home");
                }
            } else if (method === "Register") {
                const res = await api.post("api/user-register/", {
                    username: formData.username,
                    email: formData.email,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobileNo: formData.mobileNo,
                    password1: formData.password1,
                    password2: formData.password2
                });

                if (res.status === 201) {
                    const loginRes = await api.post("/api/token/obtain/", {
                        username: formData.username,
                        password: formData.password1
                    });

                    if (loginRes.status === 200) {
                        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
                        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
                        handleLogin(); // Call handleLogin after successful login
                        navigate("/home");
                    } else {
                        alert("Registration successful, but login failed.");
                    }
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="form-wrapper">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>{method}</h1>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                {method === "Register" && (
                    <>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-input"
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            placeholder="First Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-input"
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            placeholder="Last Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-input"
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            placeholder="Mobile Number"
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                <input
                    className="form-input"
                    type="password"
                    name="password1"
                    value={formData.password1}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                {method === "Register" && (
                    <input
                        className="form-input"
                        type="password"
                        name="password2"
                        value={formData.password2}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                    />
                )}
                <button className="form-button">{method}</button>
                <div>
                    <AuthSwitch method={method} navigate={navigate} />
                </div>
            </form>
        </div>
    );
}

export default Form;
