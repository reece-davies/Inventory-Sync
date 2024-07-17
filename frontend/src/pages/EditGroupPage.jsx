import {useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'

// components
import EditGroupForm from '../components/EditGroupForm.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const EditGroupPage = () => {
    const initialState = {
        _id: '...',
        group_name: '...',
        notes: '...'
      }
    const { id } = useParams();
    const [group, setGroup] = useState(initialState)
    const {VerifyToken, userId} = VerifyTokenHook()

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await fetch('/api/groups/' + id.toString())
                //console.log("Response = ", response)
                console.log('id string = /api/groups/' + id.toString())

                if (!response.ok) {
                    throw new Error('Failed to fetch group')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                console.log("JSON = ", json)
                setGroup(json)
            } catch (error) {
                console.error('Error fetching group:', error)
            }
        }

        VerifyToken()

        const interval = setInterval(() => {
            fetchGroup()
        }, 1000);



        //Clearing the interval
        return () => clearInterval(interval);

    }, [])
    return (
        <div>
            <h2>Edit Group</h2>
            <div className="edit-group-page">
                <EditGroupForm key={group._id} group={group} userId={userId}/>
            </div>
        </div>
    )
}

export default EditGroupPage