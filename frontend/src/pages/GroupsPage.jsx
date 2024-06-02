import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import GroupDetails from '../components/GroupDetails.jsx'

const GroupsPage = () => {

    const [group, setGroup] = useState(null)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('/api/groups')
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

        const interval = setInterval(() => {
            fetchGroups()
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);

    }, [])
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
                                <th>_id</th>
                                <th>group_name</th>
                                <th>notes</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        {group && group.map((groupItem) => (
                            <GroupDetails key={groupItem._id} group={groupItem} />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GroupsPage