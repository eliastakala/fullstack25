import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationRemoved, notificationSet } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationSet(`You created '${content}'`))
    setTimeout(() => {
      dispatch(notificationRemoved())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">add</button>
        </form>
    </div>
  )
}

export default AnecdoteForm