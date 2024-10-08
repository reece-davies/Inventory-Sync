import { Link } from 'react-router-dom'
import {useState, setState} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GroupDetails = ({ group, index }) => {

    const [error, setError] = useState('')

    const handleDelete = async () => {

        try {
            // local '/api/inventory/groupid/'+group._id
            const response = await fetch('https://inventory-sync.onrender.com/api/inventory/groupid/'+group._id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
            })
            console.log("Response = ", response)

            if (!response.ok) {
                throw new Error('Failed to fetch inventory')
            }
            
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format - expected JSON')
            }
            
            const json = await response.json()
            if (json === null) {

                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to delete this group?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                // Perform DELETE request
                                // local '/api/groups/' + group._id
                                const response = await fetch('https://inventory-sync.onrender.com/api/groups/' + group._id, {
                                    method: 'DELETE',
                                    body: JSON.stringify(group),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    credentials: 'include', // Include cookies in the request
                                })
                                console.log(response)
                                const json = await response.json()
                        
                                if (!response.ok) {
                                    setError(json.error)
                                }
                                else if (response.ok) {
                                    console.log("Group deleted", json)
                                }
                                alert("Group deleted") 
                                
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {}
                        }
                    ]
                  });

            }
            else {
                setError("There are inventory items in the selected list")
                alert("Error. There are inventory items in the selected list") 
                console.log(error)
            }
            

        } catch (error) {
            console.error('Error fetching inventory:', error)
        }

        /*
        const response = await fetch('/api/groups/' + group._id, {
            method: 'DELETE',
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        else if (response.ok) {
            console.log("Group deleted", json)
        }
        alert("Group deleted") */
    }


    return (
        <tbody>
             <tr key={group._id}>
                    <td>{index}</td>
                    <td>{group.group_name}</td>
                    <td>{group.notes}</td>
                    <td>{ formatDistanceToNow(new Date(group.updatedAt), { addSuffix: true}) }</td>
                    <td><button className="button-default"><Link className="button-link" to={`/groups/edit/${group._id}`}>Edit</Link></button><button className="button-default" onClick={handleDelete}>Delete</button></td>
                </tr>
        </tbody>
    )
}

export default GroupDetails