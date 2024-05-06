import {useEffect, useState } from 'react'

const Home = () => {

    const [inventory, setInventory] = useState(null)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory')
                console.log(response)

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory')
                }
                
                const contentType = response.headers.get('content-type')
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format - expected JSON')
                }
                
                const json = await response.json()
                setInventory(json)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }

        fetchInventory()
    }, [])
    return (
        <div className="home">
            <h2>Home page</h2>
            <div className="inventory">
                {inventory && inventory.map((inventItem) => (
                    <p key={inventItem._id}>{inventItem.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home