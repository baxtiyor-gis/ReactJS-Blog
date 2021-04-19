import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

const UpdateBlog = ({ updateBlog, fetchBlog, categories }) => {
	const { id } = useParams()
	const history = useHistory()

	const [isPending, setIspending] = useState(true)
	const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState(categories[0] && categories[0]._id)
    const [tags, setTags] = useState('')

    useEffect(() => {
    const getBlog = async () => {
      const blog = await fetchBlog(id)
      setName(blog.name)
      setText(blog.text)
      setCategory(blog.category !== null ? blog.category._id : (categories[0] && categories[0]._id))
      setTags(blog.tags.map(tag => tag))
      setIspending(false)
    }
    getBlog()
  }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name || !text) {
            alert('Please, write some characters in name or text input')
            return
        }

        const newBlog = {
        	_id: id,
            name: name,
            text: text,
            category: category,
            tags: tags
        }

        const res = await updateBlog(newBlog)
        if (res.message !== 'succes') {
        	alert(res.message)
        } else {
        	history.push('/')
        }
    }

    const onChangeName = e => setName(e.target.value)
    const onChangeText = e => setText(e.target.value)
    const onChangeCategory = e => setCategory(e.target.value)
    const onChangeTags = e => setTags(e.target.value)

	return (
		<form className="add-form" onSubmit={onSubmit}>
	        <h2>Update Blog</h2>
	        {isPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
	        <div className="form-control">
	          <label>Blog Name</label><br />
	          <input
	            type="text"
	            placeholder="The name will be..."
	            value={name}
	            onChange={onChangeName}
	          />
	        </div><br />

	        <div className="form-control">
	          <label>Blog Text</label><br />
	          <textarea value={text} onChange={onChangeText}></textarea>
	        </div><br />

	        <div className="form-control">
	          <label>Blog Category</label><br />
	          <select value={category} onChange={onChangeCategory}>
	            {categories.map((categoryIn, index) => (
	              <option key={index} value={categoryIn._id}>{categoryIn.name}</option>
	            ))}
	          </select>
	        </div><br />

	        <div className="form-control">
	          <label>Blog Tags</label><br />
	          <input 
	            type="text" 
	            placeholder="The tags will be..."
	            value={tags} 
	            onChange={onChangeTags} 
	          />
	        </div><br />

	        <input type="submit" value="submit" />
	    </form>
	)
}

export default UpdateBlog