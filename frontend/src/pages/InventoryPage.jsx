import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom";

// Cookies & JWT guide
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

// components
import InventoryDetails from '../components/InventoryDetails.jsx'

const InventoryPage = () => {

    const [inventory, setInventory] = useState(null)
    
    const navigate = useNavigate()

    // From cookies guide
    const cookies = new Cookies()
    const userToken = cookies.get('token');
    const [userId, setUserId] = useState('')

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
                console.log("UID (1) = ", userId)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        const verifyToken = async () => {

            console.log("login token = ", userToken)
            // Check if user token exists. Was if (!cookies.token)
            if (!userToken) {
                console.log("NO COOKIE, NAVIGATE AWAY")
                navigate("/login");
            }
           
            const decoded = jwtDecode(userToken)
            console.log("Decoded jwt = ", decoded)
            setUserId(decoded._id)
            console.log("UID (0) = ", userId)
            
        }

        const interval = setInterval(() => {
            fetchInventory()
        }, 1000);

        verifyToken()
        //Clearing the interval
        return () => clearInterval(interval);

        //fetchInventory()
        
    }, [cookies, navigate])
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