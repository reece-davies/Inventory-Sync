import {useEffect, useState } from 'react'
// Cookies & JWT guide
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

// Decodes token for frontend (navbar) to use for username (userId retrieved from token) 
export const VerifyTokenHook = () => {
    // From cookies YT guide
    const cookies = new Cookies()
    const userToken = cookies.get('token');
    const [userId, setUserId] = useState('')

    const VerifyToken = async () => {
        try {
            if (!userToken) {
                console.log("No token found");
                return null;  // Return null if no token is found
            }

            const decoded = jwtDecode(userToken);
            console.log("Decoded JWT = ", decoded);
            setUserId(decoded._id);
            return decoded;
        } catch (error) {
            console.error("Invalid token specified:", error);
            return null;  // Return null if token is invalid
        }

        // Check if user token exists. Was if (!cookies.token)
        /*if (!userToken) {
            console.log("NO COOKIE, NAVIGATE AWAY")
            navigate("/login");
        }*/
        
        /*    
        const decoded = jwtDecode(userToken)
        console.log("Decoded JWT = ", decoded)
        setUserId(decoded._id) */
    }

    return {VerifyToken, userId};
}
