import {useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

// components
import GroupDetails from '../components/GroupDetails.jsx'

const HomePage = () => {

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
        <div className="home-page">
            <h2>Home</h2>
            <p>Text</p>
        </div>
    )
}

export default HomePage