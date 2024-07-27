import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const InventoryForm = ({userId}) => {
    const initialState = {
        _id: '0',
        group_name: 'select_group',
        status: 'select_status'
    }
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [groups, setGroups] = useState([])
    const [selectedGroupId, setSelectedGroupId] = useState(initialState._id)
    const [status, setStatus] = useState(initialState.status)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [emptyFields, setEmptyFields] = useState([])

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const inventory = {title, description, group: selectedGroupId, status, user_id: userId}

        /*if (title === '') {
            return setError("Title is required")
        }
        else if (selectedGroupId === initialState._id ) {
            return setError("Group is required")
        }
        else if (status === "select_status") {
            return setError("Status is required")
        } */

        const response = await fetch('/api/inventory', {
            method: 'POST',
            body: JSON.stringify(inventory),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            console.log("New inventory item added", json)
            alert("Item added")
            navigate("/inventory/")
        }
    }

    return (
        <form className="create-inventory-form" onSubmit={handleSubmit}>
            <label>Title*</label> <br/>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : 'form-input'}
            /> <br/>
            <label>Description</label> <br/>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="form-input"
            /> <br/>
            <label>Group*</label> <br/>
            <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className={emptyFields.includes('group') ? 'error' : 'form-input'}>
                <option value={initialState._id}>Select Group</option>
                {groups && groups.map((groupItem) => (
                    <option key={groupItem._id} value={groupItem._id}>{groupItem.group_name} </option>
                ))}
            </select><br/>
            <label>Status*</label> <br/>
            <select
                onChange={(e) => setStatus(e.target.value)}
                className={emptyFields.includes('status') ? 'error' : 'form-input'}>
                    <option value={initialState.status}>Select Status</option>
                    <option value='In stock'>In stock</option>
                    <option value='Assigned'>Assigned</option>
                    <option value='Damaged'>Damaged</option>
                    <option value='Missing'>Missing</option>
                    <option value='Scrapped'>Scrapped</option>
                    <option value='Other'>Other</option>
            </select><br/>

            <button>Submit</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    )
}

export default InventoryForm