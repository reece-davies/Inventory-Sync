import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InventoryDetails = ({ inventory }) => {
    const [groupName, setGroupName] = useState(''); // State to store the fetched group name
    const [error, setError] = useState(null); // State to store any errors

    const handleDelete = async () => {
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
                <td>{inventory._id}</td>
                <td>{inventory.title}</td>
                <td>{inventory.description}</td>
                <td>{groupName}</td>
                <td>{inventory.status}</td>
                <td>{inventory.updatedAt}</td>
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