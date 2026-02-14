import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } 
    const anecdotesToShow = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase()))
    return anecdotesToShow
  })

  const vote = ({ id, content }) => {
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote({id: anecdote.id, content: anecdote.content})}>vote</button>
        </div>
      </div>
      ))}
    </div>
  )
}

export default AnecdotesList