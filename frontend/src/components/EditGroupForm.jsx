import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EditGroupForm = ({ group, userId}) => {
    const [group_name, setGroupName] = useState(group.group_name)
    const [notes, setNotes] = useState(group.notes)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handSubmit = async (e) => {
        e.preventDefault()

        const editedGroup = {group_name, notes}

        const response = await fetch('/api/groups/'+group._id, {
            method: 'PATCH',
            body: JSON.stringify(editedGroup),
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
            //setTitle("")
            //setDescription("")
            //setGroup("")
            //setStatus("")
            //setError(null)
            console.log("Group edited", json)

            // Alert user
            alert("Group edited")
            
            // Navigate back to groups
            navigate("/groups/")
        }


    }
    return (
        <form className="edit-group-form" onSubmit={handSubmit}>

            <label>Group Name</label> <br/>
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

export default EditGroupForm