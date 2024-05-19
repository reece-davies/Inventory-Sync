import {useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'

// components

const EditInventItemPage = () => {
    /* */
    const { id } = useParams();
    const [inventory, setInventory] = useState("")
    //console.log("Inventory (1) = ", inventory)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory/' + id.toString())
                //console.log("Response = ", response)
                console.log('id string = /api/inventory/' + id.toString())

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                console.log("JSON = ", json)
                //console.log("Inventory (2) = ", inventory)
                setInventory(json)
                //console.log("Inventory (3) = ", inventory)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        
        const interval = setInterval(() => {
            fetchInventory()
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);

    }, [])
    return (
        <div>
            <h2>Edit Inventory Item</h2>
            <p>URL ID = {id}</p>
            <p>ID = {inventory._id}</p>
            <p>Title = {inventory.title}</p>
            <p>Description = {inventory.description}</p>
            <p>Group = {inventory.group}</p>
            <p>Status = {inventory.status}</p>
            
            <div className="edit-inventory-page">
                {/*<h2>Edit Inevntory Item</h2>*/}
                <div className="inventory-div">
                </div>
            </div>
        </div>
    )
}

export default EditInventItemPage