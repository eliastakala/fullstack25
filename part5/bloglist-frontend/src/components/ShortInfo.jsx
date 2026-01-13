const ShortInfo = ({ blog, details }) => {
  return (
    <div>
      {blog.title} {blog.author} <button onClick={details}>show details</button>
    </div>
  )
}

export default ShortInfo