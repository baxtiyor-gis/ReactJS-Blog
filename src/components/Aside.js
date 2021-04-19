import Category from './Category'
import { useLocation } from 'react-router-dom'

const Aside = ({ categories, isCPending }) => {
	const location = useLocation().pathname.split('/')


  return (
  	<>
    {(location[1] === '' || location[1] === 'blogs' || location[1] === 'categories') && 
    (<aside>
      <h2>Categories</h2>
      {isCPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
      {!isCPending && (categories.length !== 0 ? (categories.map((category, index ) => (<Category key={index} category={category} />))) : (<h1 className="alt">No categories to show</h1>))}
    </aside>)}
  	</>
  )
}

export default Aside
