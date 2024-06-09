import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
    }
    
    return (
        <div>
            <h2>Sign Up</h2>
            <div className="signup-page">


                <form className="signup-form" onSubmit={handleSubmit}>

                    <label>Email:</label> <br/>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    /> <br/>
                    <label>Password</label> <br/>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                    /> <br/>

                    <button>Submit</button>
                    {error && <div className="error-msg">{error}</div>}
                </form>





                
            </div>
        </div>
    )
}

export default SignupPage