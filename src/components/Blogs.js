import Blog from './Blog'

const Blogs = ({ blogs, onDelete }) => {
  return (
    <>
      {blogs.map((blog, index) => (
        <Blog key={index} blog={blog} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Blogs