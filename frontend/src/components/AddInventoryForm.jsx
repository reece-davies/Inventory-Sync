import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const InventoryForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [group, setGroup] = useState('select_group')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handSubmit = async (e) => {
        e.preventDefault()

        const inventory = {title, description, group, status}

        if(group==='select_group') {
            console.log("ERROR (1) = ", error)
            return setError("Select Group")
        }

        const response = await fetch('/api/inventory', {
            method: 'POST',
            body: JSON.stringify(inventory),
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
            setError(null)
            console.log("New inventory item added", json)

            // Alert user
            alert("Item added")
            
            // Navigate back to inventory
            navigate("/inventory/")
        }


    }
    return (
        <form className="create-inventory-form" onSubmit={handSubmit}>
            {/*<h3>Add Inventory Item</h3>*/}

            <label>Title</label> <br/>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            /> <br/>
            <label>Description</label> <br/>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description} 
            /> <br/>
            <label>Group</label> <br/>
            {/*<input
                type="text"
                onChange={(e) => setGroup(e.target.value)}
                value={group} 
            /> <br/> */}

            <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}>
                <option value="select_group">Select Group</option>
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
                <option value="Group 3">Group 3</option>
            </select><br/>
            <label>Status</label> <br/>
            <input
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status} 
            /> <br/>

            <button>Submit</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    )
}

export default InventoryForm