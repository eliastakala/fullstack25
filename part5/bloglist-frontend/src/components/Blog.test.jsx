import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content correctly', () => {
  const user = {
    name: 'Remi',
    username: 'remil',
    id: 'test user id'
  }
  const blog = {
    id: 'testing id',
    title: 'testing title',
    author: 'Remi',
    user: { id: 'test user id' },
    url: 'test url',
    likes: 2
  }

  render(<Blog blog={blog} user={user} />)

  const titleElement = screen.getByText('testing title Remi')
  expect(titleElement).toBeDefined()
  const urlElement = screen.queryByText('test url')
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText(2)
  expect(likesElement).toBeNull()
})

test('buttons work', async () => {
  const user = {
    name: 'Remi',
    username: 'remil',
    id: 'test user id'
  }
  const blog = {
    id: 'testing id',
    title: 'testing title',
    author: 'Remi',
    user: { id: 'test user id' },
    url: 'test url',
    likes: 2
  }

  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} user={user}
    />)

  screen.debug()
  const container = render(<Blog blog={blog} user={user} />)
  const userui = userEvent.setup()
  const button = screen.getByText('show details')
  // console.log('screen', screen)
  await userui.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(screen.getByText(/component testing is done with react-testing-library/i)).toBeInTheDocument()
  expect(screen.getByText(/remi/i)).toBeInTheDocument()
  expect(screen.queryByText('is.fi')).not.toBeInTheDocument()
  expect(screen.queryByText('2')).not.toBeInTheDocument()
  const input = container.querySelector('#titleAndAuthor')
  expect(input).toBeInTheDocument()
})
