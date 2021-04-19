import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import AddBlog from './pages/AddBlog'
import AddCategory from './pages/AddCategory'
import Header from './components/Header'
import Footer from './components/Footer'
import Aside from './components/Aside'
import UpdateBlog from './pages/UpdateBlog'
import UpdateCategory from './pages/UpdateCategory'
import ViewBlog from './pages/ViewBlog'
import ViewCategory from './pages/ViewCategory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [isBPending, setIsBPending] = useState(true)
  const [isCPending, setIsCPending] = useState(true)


  useEffect(() => {
    const getBlogs = async () => {
      const blogsFromServer = await fetchBlogs()
      setBlogs(blogsFromServer)
      setTimeout(() => setIsBPending(false), 3000)
    }
    getBlogs()
  }, [categories])

  useEffect(() => {
    const getCategories= async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
      setTimeout(() => setIsCPending(false), 2500)
    }

    getCategories()
  }, [])

  //Fetch Blogs
  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/api/blogs')
    const api = await res.json()
    const data = await api.blogs

    return data
  }

  //Fetch Blog
  const fetchBlog = async (id) => {
    const res = await fetch('http://localhost:5000/api/blogs/' + id)
    const api = await res.json()
    const data = await api.blog

    return data
  }

  //Fetch Categories
  const fetchCategories = async () => {
    const res = await fetch('http://localhost:5000/api/categories')
    const api = await res.json()
    const data = await api.categories

    return data
  }

  //Fetch Category
  const fetchCategory = async (id) => {
    const res = await fetch('http://localhost:5000/api/categories/' + id)
    const api = await res.json()
    const data = await api.category

    return data
  }

  //Add Blog
  const addBlog = async (blog) => {
    const res = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
    const data = await res.json()

    const newB = await fetchBlog(data.blog._id)
    setBlogs([...blogs, { ...data.blog, category : {_id: newB._id, name: newB.name}}])
  }

  //Add Category
  const addCategory = async (category) => {
    const res = await fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    const data = await res.json()

    setCategories([...categories, data.category])
  }

  //Delete Blog
  const deleteBlog = async (id) => {
    setIsBPending(true)
    const res = await fetch('http://localhost:5000/api/blogs/' + id, {
      method: 'DELETE',
    })
    const data = await res.json()

    if (data.message === 'succes') {
      setBlogs(blogs.filter(blog => blog._id !== id))
    } else {
      alert('Xatolik yuz berdi')
    }
    setTimeout(() => setIsBPending(false), 1500)
  }

  //Delete Category
  const deleteCategory = async (id) => {
    setIsCPending(true)
    const res = await fetch('http://localhost:5000/api/categories/' + id, {
      method: 'DELETE',
    })
    const data = await res.json()

    if (data.message === 'succes') {
      setCategories(categories.filter(category => category._id !== id))
    } else {
      alert('Xatolik yuz berdi')
    }
    setTimeout(() => setIsCPending(false), 1500)
  }

  //Update Blog 
  const updateBlog = async (newBlog) => {
    const res = await fetch(`http://localhost:5000/api/blogs/${newBlog._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    })

    const data = await res.json()

    if (data.message === 'succes') {
      const newC = await fetchCategory(data.updateBlog.category)
      setBlogs(
        blogs.map((blog) =>
          blog._id === data.updateBlog._id ? {...data.updateBlog,category:{_id: newC._id, name: newC.name}} : blog
        )
      )
    }
    return data
  }

  //Update Category
  const updateCategory = async newCategory => {
    const res = await fetch(`http://localhost:5000/api/categories/${newCategory._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })

    const data = await res.json()

    if (data.message === 'succes') {
      setCategories(
        categories.map((category) =>
          category._id === data.updateCategory._id ? data.updateCategory : category
        )
      )
    }
    return data
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <article>
                {isBPending && (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
                {!isBPending && (blogs.length > 0 ? (
                  <Blogs blogs={blogs} onDelete={deleteBlog}/>
                ) : (
                  <h1 className="alt">No blogs to show</h1>
                ))}
              </article>
            </Route>
            <Route path="/blogs/:id">
              <article>
                <ViewBlog fetchBlog={fetchBlog} onDelete={deleteBlog} />
              </article>
            </Route>
            <Route path="/categories/:id">
              <article>
                <ViewCategory fetchCategory={fetchCategory} onDelete={deleteCategory} />
              </article>
            </Route>
            <Route path="/addcategory">
              <AddCategory onAdd={addCategory} />
            </Route>
            <Route path="/addblog">
              <AddBlog onAdd={addBlog} categories={categories} />
            </Route>
            <Route path="/updateblog/:id">
              <UpdateBlog 
                updateBlog={updateBlog} 
                fetchBlog={fetchBlog} 
                categories={categories} 
              />
            </Route>
            <Route path="/updatecategory/:id">
              <UpdateCategory
                updateCategory={updateCategory} 
                fetchCategory={fetchCategory}
              />
            </Route>
          </Switch>
          <Aside categories={categories} isCPending={isCPending} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
