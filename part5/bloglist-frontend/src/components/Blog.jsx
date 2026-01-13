import { useState } from 'react'
import ShortInfo from './ShortInfo'
import LongInfo from './LongInfo'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }

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
      {!visible ? (
        <div style={blogStyle}>
          <ShortInfo blog={blog} details={details}/>
        </div>
      ) : (
        <div style={blogStyle}>
          <LongInfo blog={blog} details={details} like={like} deleteVisible={deleteVisible} deleteBlog={deleteBlog}/>
        </div>
      )}
    </div>
  )
}

export default Blog