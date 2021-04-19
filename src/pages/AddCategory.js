import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AddCategory = ({ onAdd, categories }) => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !description) {
      alert('Please, write some characters in name or description input')
      return
    }
    
    const newCategory = {
      name: name,
      description: description
    }
    onAdd(newCategory)

    history.push('/')
  }
  
  const onChangeName = e => setName(e.target.value)
  const onChangeDescription = e => setDescription(e.target.value)
  
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h2>Add Category</h2>
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

export default AddCategory