const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  return blogs.length === 0
  ? 0
  : _.zipObject(['author', 'blogs'], _.maxBy(_.entries(_.countBy(blogs, function(o) {return o.author})), _.last))
}

const mostLikes = (blogs) => {
  const temp = _(blogs).groupBy('author').map((blog, author) => ({
    author: author,
    likes: _.sumBy(blog, 'likes')
  }))
  .value()
  const res = _.maxBy(temp, 'likes')
  return res
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

