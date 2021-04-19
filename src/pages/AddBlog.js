import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AddBlog = ({ onAdd, categories }) => {
    const history = useHistory()

    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState(categories[0] && categories[0]._id)
    const [tags, setTags] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !text) {
            alert('Please, write some characters in name or text input')
            return
        }
        
        const newBlog = {
            name: name,
            text: text,
            category: category,
            tags: tags
        }
        onAdd(newBlog)
        
        history.push('/')
    }

    const onChangeName = e => setName(e.target.value)
    const onChangeText = e => setText(e.target.value)
    const onChangeCategory = e => setCategory(e.target.value)
    const onChangeTags = e => setTags(e.target.value)

    return (
      <form className="add-form" onSubmit={onSubmit}>
        <h2>Add Blog</h2>
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
            {categories.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
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

export default AddBlog