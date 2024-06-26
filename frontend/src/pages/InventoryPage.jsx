import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// components
import InventoryDetails from '../components/InventoryDetails.jsx'
//

const InventoryPage = () => {

    const [inventory, setInventory] = useState(null)
    //console.log("Inventory (1) = ", inventory)
    //const [cookies, removeCookie] = useCookies([]); // handles user auth cookies 
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate()

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

        const verifyCookie = async () => {

            console.log("Cookie token = ", cookies.token)
            if (!cookies.token) {
                console.log("NO COOKIE, NAVIGATE AWAY")
                navigate("/login");
            }
            

            // SET USERNAME WITH EXTRA STEPS

            // GET DB DATA 
        }

        const interval = setInterval(() => {
            fetchInventory()
        }, 1000);

        verifyCookie()
        //Clearing the interval
        return () => clearInterval(interval);

        //fetchInventory()
        
    }, [cookies, navigate, removeCookie])
    return (
        <div>
            <h2>Inventory</h2>
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