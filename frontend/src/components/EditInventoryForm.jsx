import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const EditInventoryForm = ({ inventory }) => {
    const [title, setTitle] = useState(inventory.title)
    const [description, setDescription] = useState(inventory.description)
    const [selectedGroupId, setSelectedGroupId] = useState(inventory.group)
    const [status, setStatus] = useState(inventory.status)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
    

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('/api/groups')

                if (!response.ok) {
                    throw new Error('Failed to fetch group')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                console.log("Groups = ", json)
                setGroups(json)
            } catch (error) {
                console.error('Error fetching group:', error)
                setError(error.message)
            }
        }
        fetchGroups()
    }, [])

    const handSubmit = async (e) => {
        e.preventDefault()

        const editedInventory = {title, description, group: selectedGroupId, status}

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
            <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}>
                {groups && groups.map((groupItem) => (
                    <option key={groupItem._id} value={groupItem._id}>{groupItem.group_name} </option>
                ))}
            </select><br/>
            <label>Status</label> <br/>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                    <option value='In stock'>In stock</option>
                    <option value='Assigned'>Assigned</option>
                    <option value='Damaged'>Damaged</option>
                    <option value='Missing'>Missing</option>
                    <option value='Scrapped'>Scrapped</option>
                    <option value='Other'>Other</option>
            </select><br/>

            {/*
            <input
                type="text"
                onChange={(e) => setSelectedGroupId(e.target.value)}
                value={selectedGroupId} 
            /> <br/>
            <label>Status</label> <br/>
            <input
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status} 
            /> <br/> */}

            <button>Submit</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    )
}

export default EditInventoryForm