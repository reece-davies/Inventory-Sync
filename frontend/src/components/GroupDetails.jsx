import { Link } from 'react-router-dom'

const GroupDetails = ({ group }) => {

    const handleDelete = async () => {
        const response = await fetch('/api/groups/' + group._id, {
            method: 'DELETE',
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        else if (response.ok) {
            console.log("Group deleted", json)
        }
        alert("Group deleted")
    }


    return (
        <tbody>
             <tr key={group._id}>
                    <td>{group._id}</td>
                    <td>{group.group_name}</td>
                    <td>{group.notes}</td>
                    <td><button className="button-default"><Link className="button-link" to={`/groups/edit/${group._id}`}>Edit</Link></button><button className="button-default" onClick={handleDelete}>Delete</button></td>
                </tr>
        </tbody>
    )
}

export default GroupDetails