import {useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import img from '../assets/user-icon.png'
//require('dotenv').config()

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)

        const user = {email, password}
        console.log(user)

        const response = await fetch('https://inventory-sync.onrender.com/api/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)

            if(json.emptyFields) {
                setEmptyFields(json.emptyFields)
            }
        }
        if(response.ok) {
            setError(null)
            console.log("Logged in - ", json)

            // Alert user (temporary)
            alert("Logged in")
            
            // Navigate to inventory
            navigate("/inventory/")
            //window.location.reload();
        }
    }
    
    return (
        <div class="form-container">
            <img src={img} alt="User-icon" className="user-icon"/>
            <h2>Log In</h2>
            <div className="login-page">

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email</label> <br/>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={emptyFields.includes('email') ? 'error' : 'form-input'}
                    /> <br/>
                    <label>Password</label> <br/>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                        className={emptyFields.includes('password') ? 'error' : 'form-input'}
                    /> <br/>
                    <button>Submit</button>
                    {error && <div className="error-msg">{error}</div>}
                    <br/><p>Don’t have an account? <a><Link to="/signup/">Sign Up </Link></a></p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage