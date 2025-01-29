import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Api/constants";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
// import "../styles/Form.css"

const AuthSwitch = ({ method, navigate }) => (
    <div className="auth-switch">
        <p>{method === "Login" ? "Do not have an Account?" : "Already have an Account?"}</p>
        <button onClick={() => navigate(method === "Login" ? "/register" : "/login")}>
            { method === "Login" ? "Register" : "Login" }
        </button>
    </div>
)

function Form(props) {
    const {route, method } = props
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handelSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})

            if (method === "Login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                const tokens = await api.post(import.meta.env.VITE_LOGIN_URL, {username, password})

                if (tokens.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, tokens.data.access)
                    localStorage.setItem(REFRESH_TOKEN, tokens.data.refresh)
                    navigate("/")
                } else {
                    alert("There was an error while Registering")
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <form className="form-container" onSubmit={handelSubmit}>
                <h1>{method}</h1>
                <br />
                <input className="form-input" type="text" value={username} placeholder="UserName" onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <input className="form-input" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <button className="form-button">{method}</button>
                <div>
                    <AuthSwitch method={method} navigate={navigate} />
                </div>
            </form>
        </div>
    )
}

export default Form