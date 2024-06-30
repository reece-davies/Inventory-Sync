import { Link } from 'react-router-dom'
import {useEffect } from 'react'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const Navbar = () => {
    const {VerifyToken, userId} = VerifyTokenHook()
    
    useEffect(() => {
        VerifyToken()
    }, [])
    return (
        <header>
            <div className="navbar-container">
                <div className='navbar-child'>
                    <Link to="/">
                        <h2>REECE EASE</h2>
                    </Link>
                    <nav>
                        <Link to="/inventory/" className='navbar-content'>Inventory</Link>
                        <Link to="/groups/" className='navbar-content'>Groups</Link>
                    </nav>
                </div>
                <div className='navbar-child'>
                    {userId && (
                        <nav>
                        <span>{userId}</span>
                        <button>Logout</button>
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