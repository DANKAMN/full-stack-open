import { useState } from 'react'

const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100


  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood((prev) => prev + 1)}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>

      <h1>statistics</h1>
      {
        total >= 1 ? (
          <Statistics 
            good={good} 
            bad={bad} 
            neutral={neutral} 
            total={total} 
            average={average} 
            positivePercentage={positivePercentage}  
          />
        ) : (
          <p>No feedback given</p>
        )
      }
      
      
    </div>
  )
}

export default App