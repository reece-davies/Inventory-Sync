import {useEffect, useState  } from 'react'
import { json, useParams } from 'react-router-dom'

// components
import InventoryDetails from '../components/InventoryDetails.jsx';

const EditInventItemPage = () => {
    /* */
    const { id } = useParams();
    const [inventory, setInventory] = useState(null)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory/' + id.toString())
                console.log("Response = ", response)

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                setInventory(json)
                console.log("JSON = ", json)
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
            <p>ID = {id}</p>
            <div className="edit-inventory-page">
                {/*<h2>Edit Inevntory Item</h2>*/}
                <div className="inventory-div">

                </div>
            </div>
        </div>
    )
}

export default EditInventItemPage