import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
//
import AddInventoryForm from '../components/AddInventoryForm.jsx'

const AddInventoryPage = () => {
    //
    return (
        <div>
            <h2>Add Inventory Item</h2>
            <div className="add-inventory-page">
                <AddInventoryForm />
            </div>
        </div>
    )
}

export default AddInventoryPage