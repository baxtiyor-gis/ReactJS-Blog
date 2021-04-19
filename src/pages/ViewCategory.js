import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

const ViewCategory = ({ fetchCategory, onDelete }) => {
	const history = useHistory()
	const { id } = useParams()
	const [category, setCategory] = useState({})
	const [isPending, setIsPending] = useState(true)

	useEffect(() => {
		const getCategory = async () => {
		    const categoryFromServer = await fetchCategory(id)
		    setCategory(categoryFromServer)
		    setIsPending(false)
		}
		getCategory()
	},[id, fetchCategory]);


	const createdDate = new Date(category.createdAt)
	const createdTime = createdDate.toLocaleString()
	const updatedDate = new Date(category.updatedAt)
	const updatedTime = createdDate.toLocaleString()

	return (
		<div className="view-blog">
			{isPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
			<div className="inner-remotes">
		        <button onClick={() => {onDelete(category._id); history.push('/')}}><FaTrash /></button>
		        <Link to={`/updatecategory/${category._id}`}><FaEdit /></Link>
		    </div>
			<h2>{category.name}</h2>
			<p className="description">
				Description: 
				{' ' + category.description}
			</p>
			<div className="dates">
				<span>Created at: {createdTime}</span>
				{category.updatedAt && (<span>Updated at: {updatedTime}</span>)}
			</div>
		</div>
	)
}

export default ViewCategory