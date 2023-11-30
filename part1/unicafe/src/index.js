import React from 'react'
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const handleGoodClick = () => {
  setGood(good + 1)
  console.log("good")
}

const handleNeutralClick = () => {
  setNeutral(neutral + 1)
  console.log("neutral")
}

const handleBadClick = () => {
  setBad(bad + 1)
  console.log("bad")
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  return (
    <div>
      <h2>Statistics</h2>
      {all !== 0 && (
      <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {(good - bad) / all}</p>
      <p>Positive: {(good / all) * 100}%</p>
      </div>
      )}
      {all===0 && (
        <p>No feedback given</p>
        )}
    </div>
  );
}

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);