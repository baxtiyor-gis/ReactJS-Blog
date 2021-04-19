import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
    <div className="category">
    	<Link to={`/categories/${category._id}`}>{category.name}</Link>
    	<p>{category.description}</p>
    </div>
  )
}

export default Category
