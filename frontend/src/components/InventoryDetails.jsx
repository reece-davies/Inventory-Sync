import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const InventoryDetails = ({ inventory, index }) => {
    const [groupName, setGroupName] = useState(''); // State to store the fetched group name
    const [error, setError] = useState(null); // State to store any errors

    const handleDelete = async () => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this inventory item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        // Perform DELETE request
                        const response = await fetch('/api/inventory/' + inventory._id, {
                            method: 'DELETE',
                            body: JSON.stringify(inventory),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log(response);
                        const json = await response.json();
                
                        if (!response.ok) {
                            setError(json.error);
                        } else if (response.ok) {
                            console.log("Inventory item deleted", json);
                        }
                        alert("Item deleted");
                        
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
          });
    };

    const fetchGroupName = async () => {
        try {
            const response = await fetch('/api/groups/' + inventory.group); // Use inventory.group

            if (!response.ok) {
                throw new Error('Failed to fetch group');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format - expected JSON');
            }

            const json = await response.json();
            console.log("Group = ", json);
            setGroupName(json.group_name); // Set the fetched group name
        } catch (error) {
            console.error('Error fetching group:', error);
            setError(error.message);
        }
    };

    // Use useEffect to fetch group name when component mounts or when inventory.group changes
    useEffect(() => {
        fetchGroupName();
    }, [inventory.group]);

    return (
        <tbody>
            <tr key={inventory._id}>
                <td>{index}</td>
                <td>{inventory.title}</td>
                <td>{inventory.description}</td>
                <td>{groupName}</td>
                <td>{inventory.status}</td>
                <td>{formatDistanceToNow(new Date(inventory.updatedAt), { addSuffix: true})}</td>
                <td>
                    <button className="button-default">
                        <Link className="button-link" to={`/inventory/edit/${inventory._id}`}>Edit</Link>
                    </button>
                    <button className="button-default" onClick={handleDelete}>Delete</button>
                </td>
            </tr>
            {error && <div className="error-msg">{error}</div>}
        </tbody>
    );
};

export default InventoryDetails;