const LongInfo = ({ blog, details, deleteVisible, like, deleteBlog }) => {
  return (
    <div>
      <div> {blog.title} <button onClick={details}>hide</button> </div>
      <div> {blog.url} </div>
      <div> {blog.likes} <button onClick={like}>like</button></div>
      <div> {blog.author} </div>
      <div style={deleteVisible}> <button onClick={deleteBlog}>delete</button></div>
    </div>
  )
}

export default LongInfo