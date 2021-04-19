import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

const UpdateCategory = ({updateCategory, fetchCategory}) => {
	const { id } = useParams()
	const history = useHistory()

	const [isPending, setIspending] = useState(true)
	const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
	    const getCategory = async () => {
	      const category = await fetchCategory(id)
	      setName(category.name)
	      setDescription(category.description)
	      setIspending(false)
	    }
	    getCategory()
	}, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name || !description) {
	      	alert('Please, write some characters in name or description input')
	      	return
	    }


        const newCategory = {
        	_id: id,
            name: name,
            description: description
        }

        const res = await updateCategory(newCategory)
        if (res.message !== 'succes') {
        	alert(res.message)
        } else {
        	history.push('/')
        }
    }

    const onChangeName = e => setName(e.target.value)
    const onChangeDescription = e => setDescription(e.target.value)

	return (
		<form className="add-form" onSubmit={onSubmit}>
	      <h2>Add Category</h2>
	      {isPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
	      <div className="form-control">
	        <label>Category Name</label><br />
	        <input
	          type="text"
	          placeholder="What needs to be done?"
	          value={name}
	          onChange={onChangeName}
	        />
	      </div><br />

	      <div className="form-control">
	        <label>Category Description</label><br />
	        <textarea value={description} onChange={onChangeDescription}></textarea>
	      </div><br />

	      <input type="submit" value="submit" />
	    </form>
	)
}

export default UpdateCategory