import { useState } from 'react'

const Button = ({text, action}) => {
  return (
    <>
    <button onClick={action}>{text}</button>
    </>
  )
}

const DisplayVotes = ({votes}) => {
  return(
    <div>
      has {votes} votes
    </div>
  )
}

const DisplayHighest = ({votes, anecdotes}) => {
  const maximumVotes =  Math.max(...votes)
  if (maximumVotes === 0) {
    return (
      <div>No votes yet</div>
    )
  }
  const mostVoted = anecdotes[votes.indexOf(maximumVotes)]
  return (
    <>
    <h2>Anecdote with maximum votes</h2>
    <p>{mostVoted}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const randomId = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomId)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <DisplayVotes votes={votes[selected]} />
      <Button text={'next'} action={handleNext} />
      <Button text={'vote'} action={handleVote} />
      <DisplayHighest votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App