const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const listWithTwoBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '420',
        title: 'Jäätyminen',
        author: 'Remi Lindholm',
        url: 'New York Times',
        likes: 69,
        __v: 0
      }
    ]

    const emptyObject = [
      {

      }
    ]

    const emptyList = [
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has two blogs, sum equals those', () => {
      const result = listHelper.totalLikes(listWithTwoBlogs)
      assert.strictEqual(result, 74)
    })

    test('empty object returns zero', () => {
      const result = listHelper.totalLikes(emptyObject)
      assert.strictEqual(result, 0)
    })

    test('empty list returns zero', () => {
      const result = listHelper.totalLikes(emptyList)
      assert.strictEqual(result, 0)
    })
  })