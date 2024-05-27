import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
//
import AddGroupForm from '../components/AddGroupForm.jsx'

const AddGroupPage = () => {
    //
    return (
        <div>
            <h2>Add Group</h2>
            <div className="add-group-page">
                <AddGroupForm />
            </div>
        </div>
    )
}

export default AddGroupPage