import { useState } from 'react'
import ShortInfo from './ShortInfo'
import LongInfo from './LongInfo'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const deleteVisible = { display: user.id === blog.user.id ? '': 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => {
    setVisible(!visible)
    console.log("user", blog)
  }

  return (
    <div>
      <div style={blogStyle}>
        <div style={hide}>
          <div className='shortDetails'>
            {blog.title} {blog.author} <button onClick={details}>show details</button>
          </div>
        </div>
        <div style={show}>
          <div className='longDetails'>
            <div id='longTitle'> {blog.title} {blog.author} <button onClick={details}>hide</button> </div>
            <div id='url'> {blog.url} </div>
            <div id='likes'> {blog.likes} <button onClick={like}>like</button></div>
            <div id='longAuthor'> {blog.user.name} </div>
            <div style={deleteVisible}> <button onClick={deleteBlog}>delete</button></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Blog