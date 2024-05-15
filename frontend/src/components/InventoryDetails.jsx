const InventoryDetails = ({ inventory}) => {

    const handleDelete = async () => {
        const response = await fetch('/api/inventory/' + inventory._id, {
            method: 'DELETE',
            body: JSON.stringify(inventory),
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
            console.log("Inventory item deleted", json)
        }
    }


    return (
        <tbody>
             <tr key={inventory._id}>
                    <td>{inventory._id}</td>
                    <td>{inventory.title}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.group}</td>
                    <td>{inventory.status}</td>
                    <td>{inventory.updatedAt}</td>
                    <td><button>Edit</button><button onClick={handleDelete}>Delete</button></td>
                </tr>
        </tbody>
    )
}

export default InventoryDetails