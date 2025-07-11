import { useState } from 'react'

const Header = () => {
  return (
    <>
    <h1>Give feedback</h1>
    </>
  )
}

const StaticLine = ({text, stat}) => {
  return (
    <>
    <tr>
    <td>{text}</td>
    <td>{stat}</td>
    </tr>
    </>
  )
}

const Stats = ({good, bad, neutral}) => {
  const total = good + bad + neutral;
  if (total === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
  const avg = ((good - bad) / total).toFixed(2);
  const positive =( good / total * 100).toFixed(2) + '%';
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StaticLine text = {'Good'} stat = {good}/>
          <StaticLine text = {'Neutral'} stat = {neutral}/>
          <StaticLine text = {'Bad'} stat = {bad}/>
          <StaticLine text = {'All'} stat = {total}/>
          <StaticLine text = {'Average'} stat = {avg}/>
          <StaticLine text = {'Positive'} stat = {positive}/>
        </tbody>
      </table>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  } 

  const addBad = () => {
    setBad(bad + 1)
  } 

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick={addGood} text={'good'} />
      <Button onClick={addNeutral} text={'neutral'} />
      <Button onClick={addBad} text={'bad'} />
      <Stats good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App