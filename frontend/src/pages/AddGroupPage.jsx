import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import AddGroupForm from '../components/AddGroupForm.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const AddGroupPage = () => {
    const {VerifyToken, userId} = VerifyTokenHook()

    useEffect(() => {
        VerifyToken()
    }, [])
    return (
        <div>
            <h2>Add Group for {userId}</h2>
            <div className="add-group-page">
                <AddGroupForm userId={userId}/>
            </div>
        </div>
    )
}

export default AddGroupPage