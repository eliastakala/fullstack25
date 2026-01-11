import React, { useState } from 'react';

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  console.log('blogi', blog)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const deleteVisible = {display: user.id === blog.user.id ? '': 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={details}>show details</button>
          </div>  
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <div>
            <div> {blog.title} <button onClick={details}>hide</button> </div>
            <div> {blog.url} </div>
            <div> {blog.likes} <button onClick={like}>like</button></div>
            <div> {blog.author} </div>
            <div style={deleteVisible}> <button onClick={deleteBlog}>delete</button></div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Blog