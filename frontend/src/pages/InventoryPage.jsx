import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

// components
import InventoryDetails from '../components/InventoryDetails.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const InventoryPage = () => {
    const [inventory, setInventory] = useState(null)
    // external
    const navigate = useNavigate()
    const {VerifyToken, userId} = VerifyTokenHook()

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
                setInventory(json)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        const interval = setInterval(() => {
            fetchInventory()
        }, 1000);

        //verifyTokenLocal()
        VerifyToken()

        //Clearing the interval
        return () => clearInterval(interval);

        //fetchInventory()
        
    }, [navigate])
    return (
        <div>
            <h2>Inventory for {userId}</h2>
            <button className="button-default"><Link className="button-link" to={'/inventory/add/'}>Add Inventory Item</Link></button>
            <div className="inventory-page">
                {/*<h2>Home page</h2>*/}
                <div className="inventory-table-container">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Group</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {inventory && inventory.map((inventItem) => (
                            <InventoryDetails key={inventItem._id} inventory={inventItem} />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InventoryPage