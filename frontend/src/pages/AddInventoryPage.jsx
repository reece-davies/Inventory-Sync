import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import InventoryDetails from '../components/InventoryDetails.jsx'
import InventoryForm from '../components/InventoryForm.jsx'

const InventoryPage = () => {
    //
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