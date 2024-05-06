const InventoryDetails = ({ inventory}) => {
    return (
        <tbody className="inventory-details">
             <tr key={inventory._id}>
                    <td>{inventory._id}</td>
                    <td>{inventory.title}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.group}</td>
                    <td>{inventory.status}</td>
                    <td>{inventory.updatedAt}</td>
                </tr>
        </tbody>
    )
}

export default InventoryDetails