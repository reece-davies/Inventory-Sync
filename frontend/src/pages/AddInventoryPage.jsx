import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import AddInventoryForm from '../components/AddInventoryForm.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const AddInventoryPage = () => {
    const {VerifyToken, userId} = VerifyTokenHook()

    useEffect(() => {
        VerifyToken()
    }, [])
    return (
        <div>
            <h2>Add Inventory Item for {userId}</h2>
            <div className="add-inventory-page">
                <AddInventoryForm userId={userId}/>
            </div>
        </div>
    )
}

export default AddInventoryPage