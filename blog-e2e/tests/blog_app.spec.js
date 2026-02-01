const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const locator = page.getByLabel('username:')
    await expect(locator).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Login successful')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {

      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByLabel('title').fill('test title')
        await page.getByLabel('author').fill('test author')
        await page.getByLabel('url').fill('test url')
        await page.getByRole('button', { name: 'save' }).click()

        await expect(page.getByText('Blog entry created')).toBeVisible()
    })
  })

  describe('When a blog exists', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('test title')
      await page.getByLabel('author').fill('test author')
      await page.getByLabel('url').fill('test url')
      await page.getByRole('button', { name: 'save' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
        
        await page.getByRole('button', { name: 'show details' }).click()
        const likesDiv = page.locator('.likes')
        await expect(likesDiv).toContainText('0')
        await page.getByRole('button', { name: 'like' }).click()
        await expect(likesDiv).toContainText('1')
    })

    test('blog creator can delete it', async ({ page }) => {
        
        await page.getByRole('button', { name: 'show details' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'delete' }).click()
    })

    test('delete not visible if not own blog', async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Remi Lindholm',
            username: 'remi',
            password: 'karsee'
          }
        })
        await page.getByRole('button', { name: 'Logout' }).click()
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByLabel('username').fill('remi')
        await page.getByLabel('password').fill('karsee')
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('button', { name: 'show details' }).click()

        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test('blogs sorted in correct order based on likes', async({ page, request }) => {
        await page.getByRole('button', { name: 'show details' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await page.getByLabel('title').fill('another test title')
        await page.getByLabel('author').fill('another test author')
        await page.getByLabel('url').fill('another test url')
        await page.getByRole('button', { name: 'save' }).click()

        const secondBlog = page.locator('.blog').filter({ hasText: 'another test title' });
        await secondBlog.getByRole('button', { name: 'show details' }).click()
        const blogs = await page.locator(".title-author").allTextContents()
        const secondBlogInfo = blogs[1]
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        const updatedBlogs = await page.locator(".title-author").allTextContents()
        const firstBlogInfo = updatedBlogs[0]
        expect(secondBlogInfo).toEqual(firstBlogInfo)
    })
  })
})