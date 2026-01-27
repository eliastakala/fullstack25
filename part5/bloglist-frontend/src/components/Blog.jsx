import { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const deleteVisible = { display: user.id === blog.user.id ? '': 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonText = visible ? 'hide' : 'show details'

  const details = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div className='title-author'>
        {blog.title} {blog.author} <button onClick={details}>{buttonText}</button>
      </div>
      {visible && (
        <div className='metaContent'>
          <div id='url'> {blog.url} </div>
          <div id='likes'> {blog.likes} <button onClick={like}>like</button></div>
          <div id='username'> {blog.user.name} </div>
          <div style={deleteVisible} id='deleteButton'> <button onClick={deleteBlog}>delete</button></div>
        </div>
      )}
    </div>
  )
}

export default Blog