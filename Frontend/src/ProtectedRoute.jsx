// import api from "../axios";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { useState, useEffect } from "react";
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

// function ProtectedRoute({ children }) {
//     const [isAuthorized, setIsAuthorized] = useState(null)

//     useEffect(() => {
//         auth().catch(() => setIsAuthorized(false))
//     }, [])

//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN)

//         try {
//             const res = await api.post("/api/token/refresh/", {
//                 refresh: refreshToken
//             })
//             if (res.status === 200) {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)
//             }
//         } catch (error) {
//             console.log(error)
//             setIsAuthorized(false)
//         }
//     }

//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN)

//         if (!token) {
//             setIsAuthorized(false)
//             return
//         }

//         const decoded_token = jwtDecode(token)
//         const token_exp = decoded_token.exp
//         const now = Date.now() / 1000

//         if (token_exp < now) {
//             await refreshToken()
//         } else {
//             setIsAuthorized(true)
//         }
//     }

//     if (isAuthorized === null) {
//         return <div>Loading...</div>
//     }
//     return isAuthorized ? children : <Navigate to="/login" />
// }

// export default ProtectedRoute