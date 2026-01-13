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
    user: { id: 'paskaa' },
    url: 'is.fi',
    likes: 2
  }

  render(<Blog blog={blog} user={user} />)
//   const element = screen.getByText('Component testing is done with react-testing-library')
  expect(screen.getByText(/component testing is done with react-testing-library/i)).toBeInTheDocument()
  expect(screen.getByText(/remi/i)).toBeInTheDocument()
  expect(screen.queryByText('is.fi')).not.toBeInTheDocument()
//   const element2 = screen.getByText('Remi')
//   expect(element2).toBeDefined()
//   const element3 = screen.getByText('is.fi')
//   expect(element3).toBeUndefined()
})