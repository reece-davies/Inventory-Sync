import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import InventoryDetails from '../components/InventoryDetails.jsx'
import InventoryForm from '../components/InventoryForm.jsx'

const InventoryPage = () => {

    const [inventory, setInventory] = useState(null)
    //console.log("Inventory (1) = ", inventory)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory')
                //console.log("Response = ", response)

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

        //fetchInventory()
    }, [])
    return (
        <div>
            <h2>Add Inventory Item</h2>
            <div className="add-inventory-page">
                <InventoryForm />
            </div>
        </div>
    )
}

export default InventoryPage