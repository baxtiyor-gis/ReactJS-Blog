import { Link, useLocation } from 'react-router-dom'

const Header = () => {
	const location = useLocation().pathname

  return (
    <header>
    	<Link className="home" to="/">Blog</Link>
    	<div className="adds">
    		{location !== '/' && <Link to="/">Home</Link>}
    		{location !== '/addblog' && <Link to="/addblog">Add Blog</Link>}
    		{location !== '/addcategory' && <Link to="/addcategory">Add Category</Link>}
    	</div>
    </header>
  )
}

export default Header
