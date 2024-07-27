import {useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import img from '../assets/user-icon.png'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setcheckPassword] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)

        const user = {email, password, username}
        console.log(user)

        if (password !== checkPassword) {
            return setError("Passwords do not match")
        }

        const response = await fetch('/api/user/signup', {
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
            console.log("Signed up - ", json)

            // Alert user (temporary)
            alert("Signed up")
            
            // Navigate to inventory
            navigate("/inventory/")
            window.location.reload();
        }
    }
    
    return (
        <div class="form-container">
            <img src={img} alt="User-icon" className="user-icon"/>
            <h2>Sign Up</h2>
            <div className="signup-page">

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Username</label> <br/>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className={emptyFields.includes('username') ? 'error' : 'form-input'}
                    /> <br/>
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
                        className={emptyFields.includes('password') || error.includes("Passwords do not match") ? 'error' : 'form-input'}
                    /> <br/>
                    <label>Repeat Password</label> <br/>
                    <input
                        type="password"
                        onChange={(e) => setcheckPassword(e.target.value)}
                        value={checkPassword} 
                        className={emptyFields.includes('password') || error.includes("Passwords do not match") ? 'error' : 'form-input'}
                    /> <br/>
                    <button>Submit</button>
                    {error && <div className="error-msg">{error}</div>}
                    <br/><p>Already have an account? <a><Link to="/signup/">Log in</Link></a></p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage