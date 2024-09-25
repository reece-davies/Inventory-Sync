import {useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'

// components
import EditInventoryForm from '../components/EditInventoryForm.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const EditInventoryPage = () => {
    const initialState = {
        _id: '...',
        title: '...',
        description: '...',
        group: '...',
        status: '...'
      }
    const { id } = useParams();
    const [inventory, setInventory] = useState(initialState)
    const {VerifyToken, userId} = VerifyTokenHook()

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // local '/api/inventory/'
                const response = await fetch('/api/inventory/' + id.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies in the request
                })
                
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
                setInventory(json)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        VerifyToken()
        
        const interval = setInterval(() => {
            fetchInventory()
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);

    }, [])
    return (
        <div className="form-container">
            <h2>Edit Inventory Item</h2>
            <div className="edit-inventory-page">
                <EditInventoryForm key={inventory._id} inventory={inventory} userId={userId}/>
            </div>


            {/* Testing phase
            <h4>Variable Checker</h4>
            <p>URL ID = {id}</p>
            <p>ID = {inventory._id}</p>
            <p>Title = {inventory.title}</p>
            <p>Description = {inventory.description}</p>
            <p>Group = {inventory.group}</p>
            <p>Status = {inventory.status}</p>
            */}
        </div>
    )
}

export default EditInventoryPage