import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import Parser from 'html-react-parser'

const ViewBlog = ({ fetchBlog, onDelete }) => {
	const { id } = useParams()
	const [blog, setBlog] = useState({})
	const [isPending, setIsPending] = useState(true)
	
	const nl2br = (str, is_xhtml) => {
	    if (typeof str === 'undefined' || str === null) {
	      return '';
	    }
	    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

	useEffect(() => {
		const getBlog = async () => {
		    const blogFromServer = await fetchBlog(id)
		    setBlog(blogFromServer)
		    setIsPending(false)
	    }
	    getBlog()
	}, [])

	const createdDate = new Date(blog.createdAt)
	const createdTime = createdDate.toLocaleString()
	const updatedDate = new Date(blog.updatedAt)
	const updatedTime = createdDate.toLocaleString()

	return (
		<div className="view-blog">
			{isPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
			<div className="inner-remotes">
		        <button onClick={() => onDelete(blog._id)}><FaTrash /></button>
		        <Link to={`/updateblog/${blog._id}`}><FaEdit /></Link>
		    </div>
			<h2>{blog.name}</h2>
			<div>
				Category: 
				<Link className="category" to={'/categories/' + (blog.category && blog.category._id)}>
					{blog.category && blog.category.name}
				</Link>
			</div>
			<p className="tags">{blog.tags && blog.tags[0].replace(' ', '').split(',').map(tag => ' #' + tag + ',')}</p>
			<p className="text">
				{Parser(nl2br(blog.text))}
			</p>
			<div className="dates">
				<span>Created at: {createdTime}</span>
				{blog.updatedAt && (<span>Updated at: {updatedTime}</span>)}
			</div>
		</div>
	)
}

export default ViewBlog
