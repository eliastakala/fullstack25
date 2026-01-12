import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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
    user: 'paskaa',
    url: 'is.fi',
    likes: 2
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})