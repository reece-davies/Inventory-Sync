import {useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setcheckPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)

        const user = {email, password, username}
        console.log(user)


        
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
        }
        if(response.ok) {
            setError(null)
            console.log("Signed up - ", json)

            // Alert user
            alert("Signed up")
            
            // Navigate back to groups
            navigate("/inventory/")
        }



    }
    
    return (
        <div>
            <h2>Sign Up</h2>
            <div className="signup-page">

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Username</label> <br/>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    /> <br/>
                    <label>Email</label> <br/>
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
                    { /* For when we change the signup form
                    <input
                        type="password"
                        onChange={(e) => setcheckPassword(e.target.value)}
                        value={checkPassword} 
                    /> <br/> */}
                    <button>Submit</button>
                    {error && <div className="error-msg">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default SignupPage