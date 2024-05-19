import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>REECE EASE</h2>
                </Link>
                <Link to="/">
                    <h3>Inventory</h3>
                </Link>
                <Link to="/">
                    <h3>Groups</h3>
                </Link>
            </div>
        </header>
    )
}

export default Navbar