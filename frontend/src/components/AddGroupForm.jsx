import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const GroupForm = ({userId}) => {
    const [group_name, setGroupName] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [emptyNameField, setEmptyNameField] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const group = {group_name, notes, user_id: userId}

        if (group_name === '') {
            setEmptyNameField(true)
            return setError("Group Name is required")
        }

        // local '/api/groups'
        const response = await fetch('https://inventory-sync.onrender.com/api/groups', {
            method: 'POST',
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
        })
        console.log(response)
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setError(null)
            console.log("New group added", json)

            // Alert user
            alert("Group added")
            
            // Navigate back to groups
            navigate("/groups/")
        }
    }
    return (
        <form className="create-group-form" onSubmit={handleSubmit}>

            <label>Group Name*</label> <br/>
            <input
                type="text"
                onChange={(e) => setGroupName(e.target.value)}
                value={group_name}
                className={emptyNameField === true ? 'error' : 'form-input'}
            /> <br/>
            <label>Notes</label> <br/>
            <input
                type="text"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                className="form-input"
            /> <br/>

            <button>Submit</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    )
}

export default GroupForm