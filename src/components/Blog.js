import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import Parser from 'html-react-parser'


const Blog = ({ blog, onDelete }) => {

  const createDate = new Date(blog.createdAt)
  const cD = createDate.toLocaleDateString()

  const nl2br = (str, is_xhtml) => {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  if (blog.text.length > 300) {
    blog.text = blog.text.slice(0, 300) + '...'
  }

  return (
    <div className="blog">
      <div className="remotes">
        <button onClick={() => onDelete(blog._id)}><FaTrash /></button>
        <Link to={`/updateblog/${blog._id}`}><FaEdit /></Link>
      </div>
      <Link to={`/blogs/${blog._id}`} title="Go to the blog"><h3>{blog.name}</h3></Link>
      <p>{Parser(nl2br(blog.text))}</p>
      <div className="extras">
      	<Link to={`/categories/${blog.category && blog.category._id}`}>{blog.category && blog.category.name}</Link>
      	<span>{cD}</span>
      </div>
    </div>
  )
}

export default Blog
