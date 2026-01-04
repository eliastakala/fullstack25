const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

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

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test('all blogs are returned', async () => {
const response = await api.get('/api/blogs')

assert.strictEqual(response.body.length, 2)
})

test('blogs have identifier named id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(Object.keys(response.body[0]).at(-1), 'id')
})

test('blogs are posted correctly and they increase blog count correctly', async () => {

    const newBlog = {
        "title": "1Q84",
        "author": "Murakami",
        "url": "https://www.goodreads.com/book/show/10357575-1q84",
        "likes": 118329
        }
    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const {id, ...createdBlog} = postResponse.body
    assert.deepStrictEqual(createdBlog, newBlog)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
    }
)

test('missing likes defaults to zero', async () => {

    const newBlog = {
        "title": "GEB",
        "author": "Hofstadter",
        "url": "https://www.goodreads.com/book/show/24113.G_del_Escher_Bach",
        }
    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(postResponse.body.likes, 0)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
    }
)

test('missing title or url returns 400', async () => {

    const newBlog = {
        "author": "Green",
        "url": "https://www.goodreads.com/book/show/220341389-everything-is-tuberculosis?from_choice=true",
        }
    postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)

    const newBlog2 = {
        "title": "Everything Is Tuberculosis",
        "author": "Green",
        }
    postResponse2 = await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, 2)
    }
)

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((n) => n.title)
    assert(!titles.includes(blogToDelete.title))
    
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
  })

test('a blog can be edited', async () => {

    const editedBlog = {
        "likes": 600,
    }

    const blogsAtStart = await helper.blogsInDb()

    const blogToEdit = blogsAtStart[0]
  
    await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(editedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((n) => n.title)
    assert(titles.includes(blogToEdit.title))
    
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

describe('invalid user can not be created', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation with too short password does not succeed', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.error, "Password must be at least 3 characters long")

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

  test('creation with too short username does not succeed', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'sal',
    }

    response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.match(response.body.error, /username.*shorter than/i)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

  test('creation without username does not succeed', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Matti Luukkainen',
      password: 'seppo123'
    }

    response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` is required.')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

  test('creation without password does not succeed', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mlaf',
      name: 'Matti Luukkainen',
    }

    response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.error, 'Insert password')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })
})
  

after(async () => {
await mongoose.connection.close()
})