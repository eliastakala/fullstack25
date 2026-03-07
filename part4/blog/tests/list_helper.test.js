const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const emptyObject = [{}];

  const emptyList = [];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has two blogs, sum equals those", () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    assert.strictEqual(result, 74);
  });

  test("empty object returns zero", () => {
    const result = listHelper.totalLikes(emptyObject);
    assert.strictEqual(result, 0);
  });

  test("empty list returns zero", () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const emptyObject = [{}];

  const emptyList = [];

  test("when list has only one blog, it has the max value", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("when list has two blogs, sum equals those", () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    assert.deepStrictEqual(result, listWithTwoBlogs[1]);
  });

  test("empty object returns empty object", () => {
    const result = listHelper.favoriteBlog(emptyObject);
    assert(result, {});
  });

  test("empty list returns zero", () => {
    const result = listHelper.favoriteBlog(emptyList);
    assert.strictEqual(result, 0);
  });
});

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen 2",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const twoMostBloggers = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen 2",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const emptyObject = [{}];

  const emptyList = [];

  test("when list has only two blogs...", () => {
    const result = listHelper.mostBlogs(listWithTwoBlogs);
    assert.deepStrictEqual(result, { author: "Remi Lindholm", blogs: 2 });
  });

  test("empty list", () => {
    const result = listHelper.mostBlogs(emptyList);
    assert.deepStrictEqual(result, 0);
  });

  test("two most bloggers", () => {
    const result = listHelper.mostBlogs(twoMostBloggers);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 2 });
  });
});

describe("most likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen 2",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const twoMostBloggers = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
    {
      _id: "420",
      title: "Jäätyminen 2",
      author: "Remi Lindholm",
      url: "New York Times",
      likes: 69,
      __v: 0,
    },
  ];

  const emptyObject = [{}];

  const emptyList = [];

  test("when list has only two blogs...", () => {
    const result = listHelper.mostLikes(listWithTwoBlogs);
    assert.deepStrictEqual(result, { author: "Remi Lindholm", likes: 138 });
  });
});
