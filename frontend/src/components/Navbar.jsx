import { Link } from 'react-router-dom'
import {useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';
import { LogoutHook } from '../hooks/LogoutHook.jsx';

const Navbar = () => {
    const {VerifyToken, userId} = VerifyTokenHook()
    const {Logout} = LogoutHook()
    const [user, setUser] = useState('')

    const cookies = new Cookies()

    const getUser = async () => {
        try {
            const tokenData = VerifyToken();
            if (!tokenData) {
                console.log("Invalid or no token, skipping user fetch");
                return;  // Exit if tokenData is null
            }
            
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(VerifyToken()),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch user')
            }
            
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format - expected JSON')
            }
            
            const json = await response.json()
            console.log("User verification = ", json)
            setUser(json.username)
        } catch (error) {
            console.error('Error fetching user:', error)
            //setError(error.message)
        }
    }

    const handleLogout = async () => {
        // Call LogoutHook
        Logout()
    }
    
    useEffect(() => {
        //VerifyToken()
        //getUser()                ////////////////////////// THIS HAS BEEN DISABLED FOR PROD TESTING
    }, [cookies])
    return (
        <header>
            <div className="navbar-container">
                <div className='navbar-child'>
                    <Link to="/">
                        <h2>Inventory-Sync</h2>
                    </Link>
                    <nav>
                        <Link to="/inventory/" className='navbar-content'>Inventory</Link>
                        <Link to="/groups/" className='navbar-content'>Groups</Link>
                    </nav>
                </div>
                <div className='navbar-child'>
                    {userId && (
                        <nav>
                        <span className='user-username'>{user}</span>
                        <button onClick={handleLogout}>Logout</button>
                        </nav>
                    )}
                    {!userId && (
                        <nav>
                        <Link to="/login" className='navbar-content'>Login</Link>
                        <Link to="/signup" className='navbar-content'>Signup</Link>
                    </nav>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar