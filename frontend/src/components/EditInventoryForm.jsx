import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EditInventoryForm = ({ inventory }) => {
    const [title, setTitle] = useState(inventory.title)
    const [description, setDescription] = useState(inventory.description)
    const [group, setGroup] = useState(inventory.group)
    const [status, setStatus] = useState(inventory.status)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handSubmit = async (e) => {
        e.preventDefault()

        const editedInventory = {title, description, group, status}

        const response = await fetch('/api/inventory/'+inventory._id, {
            method: 'PATCH',
            body: JSON.stringify(editedInventory),
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
            console.log("Inventory item edited", json)

            // Alert user
            alert("Item edited")
            
            // Navigate back to inventory
            navigate("/inventory/")
        }


    }
    return (
        <form className="edit-inventory-form" onSubmit={handSubmit}>
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
            <input
                type="text"
                onChange={(e) => setGroup(e.target.value)}
                value={group} 
            /> <br/>
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

export default EditInventoryForm