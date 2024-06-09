import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="navbar-container">
                <Link to="/">
                    <h2>REECE EASE</h2>
                </Link>
                <nav>
                    <Link to="/inventory/" className='navbar-content'>Inventory</Link>
                    <Link to="/groups/" className='navbar-content'>Groups</Link>
                </nav>
                <nav>
                    <div>
                        <Link to="/login" className='navbar-content'>Login</Link>
                        <Link to="/signup" className='navbar-content'>Signup</Link>
                    </div>
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar