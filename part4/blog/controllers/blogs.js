const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {  
    const body = request.body
    const user = request.user

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user
    const id = request.params.id
    const blogToDelete = await Blog.findById(id)
    if (blogToDelete.user.toString() === user.id) {
      await Blog.findByIdAndDelete(id)
      return response.status(204).end()
    }
    return response.status(403).json({ error: 'only the creator can delete a blog' })
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  blog.title = title ?? blog.title
  blog.author = author ?? blog.author
  blog.url = url ?? blog.url
  blog.likes = likes ?? blog.likes

  try {
    const savedBlog = await blog.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.json(populatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter