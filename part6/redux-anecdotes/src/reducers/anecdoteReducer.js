import { createSlice } from '@reduxjs/toolkit'

const asObject = ({ content, id }) => {
  return {
    content: content,
    id: id,
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      console.log('content', content)
      state.push(asObject({ content: content.content, id: content.id }))
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer