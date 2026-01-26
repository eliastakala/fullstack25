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
  }

  return (
    <div>
      <div style={blogStyle}>
        <div style={hide}>
          <div id='titleAndAuthor'>
            {blog.title} {blog.author} <button onClick={details}>show details</button>
          </div>
        </div>
        <div style={show}>
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