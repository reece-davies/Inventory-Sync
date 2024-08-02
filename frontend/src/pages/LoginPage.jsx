import {useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import img from '../assets/user-icon.png'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

        const user = { email, password };
        console.log(user);

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Log the raw response for debugging
            console.log('Raw response:', response);

            // Check if the response is OK before parsing
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            // Parse the JSON response
            const json = await response.json();

            // Log the parsed JSON for debugging
            console.log('Parsed JSON:', json);

            if (json.error) {
                setError(json.error);

                if (json.emptyFields) {
                    setEmptyFields(json.emptyFields);
                }
            } else {
                setError(null);
                console.log("Logged in - ", json);

                // Alert user (temporary)
                alert("Logged in");

                // Navigate to inventory
                navigate("/inventory/");
                window.location.reload();
            }
        } catch (error) {
            // Handle any errors that occurred during fetch or parsing
            console.error('Fetch error:', error);
            setError('An error occurred during login.');
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