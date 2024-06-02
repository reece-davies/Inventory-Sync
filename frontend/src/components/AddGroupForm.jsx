import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const GroupForm = () => {
    const [group_name, setGroupName] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const group = {group_name, notes}

        if (group_name === '') {
            return setError("Group Name is required")
        }

        const response = await fetch('/api/groups', {
            method: 'POST',
            body: JSON.stringify(group),
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
            /> <br/>
            <label>Notes</label> <br/>
            <input
                type="text"
                onChange={(e) => setNotes(e.target.value)}
                value={notes} 
            /> <br/>

            <button>Submit</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    )
}

export default GroupForm