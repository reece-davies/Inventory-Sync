import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="navbar-container">
                <Link to="/">
                    <h2>REECE EASE</h2>
                </Link>
                <Link to="/inventory/" className='navbar-content'>
                    <h4>Inventory</h4>
                </Link>
                <Link to="/groups/" className='navbar-content'>
                    <h4>Groups</h4>
                </Link>
            </div>
        </header>
    )
}

export default Navbar