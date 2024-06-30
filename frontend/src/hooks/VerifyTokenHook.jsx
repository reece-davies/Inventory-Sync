import {useEffect, useState  } from 'react'
// Cookies & JWT guide
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";


export const VerifyTokenHook = () => {
    // From cookies guide
    const cookies = new Cookies()
    const userToken = cookies.get('token');
    const [userId, setUserId] = useState('')

    const VerifyToken = async () => {
        console.log("User JWT = ", userToken)

        // Check if user token exists. Was if (!cookies.token)
        /*if (!userToken) {
            console.log("NO COOKIE, NAVIGATE AWAY")
            navigate("/login");
        }*/
        
        const decoded = jwtDecode(userToken)
        console.log("Decoded JWT = ", decoded)
        setUserId(decoded._id)
        //console.log("UID (0) = ", userId)
    }

    return {VerifyToken, userId};
}
