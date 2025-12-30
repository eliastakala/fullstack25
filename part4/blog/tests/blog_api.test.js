const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { CLIENT_RENEG_WINDOW } = require('node:tls')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "The Prince",
        "author": "Machiavelli",
        "url": "https://www.goodreads.com/book/show/28862.The_Prince",
        "likes": "114318"
    },
    {
        "title": "The Alchemist",
        "author": "Coelho",
        "url": "https://www.goodreads.com/book/show/18144590-the-alchemist",
        "likes": "1405461"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test.only('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test.only('all blogs are returned', async () => {
const response = await api.get('/api/blogs')

assert.strictEqual(response.body.length, 2)
})

test.only('blogs have identifier named id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(Object.keys(response.body[0]).at(-1), 'id')
    })

after(async () => {
await mongoose.connection.close()
})