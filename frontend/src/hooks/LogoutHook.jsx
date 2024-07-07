import { useNavigate } from 'react-router-dom'
// Cookies & JWT guide
import Cookies from 'universal-cookie';

export const LogoutHook = () => {

    // From cookies guide
    const cookies = new Cookies()
    const userToken = cookies.get('token');

    const navigate = useNavigate()

    const Logout = async () => {
        try {
            if (!userToken) {
                console.log("No token found. Cannot logout.");
                return null;  // Return null if no token is found
            }

            // Remove token cookie
            cookies.remove('token', { path: '/' });

            // Alert user (temporary)
            alert("Signed out")
                
            // Navigate to inventory
            navigate("/login")
            window.location.reload();
        } catch (error) {
            console.error("Logout error occured", error);
            return null;  // Return null if token is invalid
        }
    }
    return {Logout};
}