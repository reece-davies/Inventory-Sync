import {useEffect, useState } from 'react'

// components
import InventoryDetails from '../components/InventoryDetails.jsx'

const Home = () => {

    const [inventory, setInventory] = useState(null)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory')
                console.log(response)

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                setInventory(json)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        fetchInventory()
    }, [])
    return (
        <div className="home">
            {/*<h2>Home page</h2>*/}
            <div className="inventory-div">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>title</th>
                            <th>description</th>
                            <th>group</th>
                            <th>status</th>
                            <th>updatedAt</th>
                        </tr>
                    </thead>
                    {inventory && inventory.map((inventItem) => (
                        <InventoryDetails key={inventItem._id} inventory={inventItem} />
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Home