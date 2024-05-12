const InventoryDetails = ({ inventory}) => {

    const handleClick = async () => {
        const response = await fetch('/api/inventory/' + inventory._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            //DELETE WORKOUT USING CONTEXT
            // use InventoryForm for understanding
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
                    <td><button>Edit</button><button>Delete</button></td>
                </tr>
        </tbody>
    )
}

export default InventoryDetails