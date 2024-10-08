import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import GroupDetails from '../components/GroupDetails.jsx'
import { VerifyTokenHook } from '../hooks/VerifyTokenHook.jsx';

const GroupsPage = () => {
    const [group, setGroup] = useState(null)
    const {VerifyToken, userId} = VerifyTokenHook()

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                // local '/api/groups'
                const response = await fetch('https://inventory-sync.onrender.com/api/groups', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies in the request
                })
                //console.log("Response = ", response)

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
            fetchGroups()
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);

    }, [userId])
    return (
        <div>
            <h2>Groups</h2>
            <button className="button-default"><Link className="button-link" to={'/groups/add/'}>Add Group</Link></button>
            <div className="groups-page">
                {/*<h2>Home page</h2>*/}
                <div className="groups-table-container">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Group Name</th>
                                <th>Notes</th>
                                <th>Last Updated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {group && group.map((groupItem, index) => (
                            <GroupDetails key={groupItem._id} group={groupItem} index={index + 1} />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GroupsPage