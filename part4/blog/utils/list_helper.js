const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + (item.likes ?? 0)
    }
    console.log("length of blogs", blogs.length)
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
  ? 0
  : blogs.reduce(
      (prev, current) => {
        return prev.likes > current.likes ? prev : current
      }
    )
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }

