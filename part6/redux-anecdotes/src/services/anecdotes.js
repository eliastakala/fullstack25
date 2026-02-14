const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const getAnecdote = async (id) => {
  const response = await fetch(baseUrl + '/' + id)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}


const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: content,
      votes: 0
    }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const likeAnecdote = async ({ id, votes }) => {
  const urlToUpdate = baseUrl + '/' + id
  const response = await fetch(urlToUpdate, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      votes: votes
    })
  })

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

export default { getAll, createNew, likeAnecdote, getAnecdote }