import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content correctly', () => {
  const user = {
    name: 'Remi',
    username: 'remil',
    id: 'paskaa'
  }
  const blog = {
    id: 'siis ihan paskaa',
    title: 'Component testing is done with react-testing-library',
    author: 'Remi',
    user: { id: 'paskaa' },
    url: 'is.fi',
    likes: 2
  }

  render(<Blog blog={blog} user={user} />)

  const titleElement = screen.getByText('Component testing is done with react-testing-library')
  expect(titleElement).toBeDefined()
  const authorElement = screen.getByText('Remi')
  expect(authorElement).toBeDefined()
  const notVisibleElement = screen.getByText('is.fi')
  expect(notVisibleElement).not.toBeVisible()
  // expect(screen.getByText('component testing is done with react-testing-library', { exact: false })).toBeInTheDocument()
  // expect(screen.getByText('remi', { exact: false })).toBeInTheDocument()
  // expect(screen.queryByText('is.fi')).not.toBeInTheDocument()
  // expect(screen.queryByText('2')).not.toBeInTheDocument()
})

test('buttons work', async () => {
  const user = {
    name: 'Remi',
    username: 'remil',
    id: 'paskaa'
  }
  const blog = {
    id: 'siis ihan paskaa',
    title: 'Component testing is done with react-testing-library',
    author: 'Remi',
    user: { id: 'paskaa' },
    url: 'is.fi',
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
