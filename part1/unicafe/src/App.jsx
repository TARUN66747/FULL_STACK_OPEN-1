import { useState } from 'react'
const Button = (props)=>{
   return <button onClick={props.onClick} >{props.text}</button>
}

const Statistics = (props) => {
  return (
    <p>
     {props.name}  {props.value}
    </p>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + bad * -1) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1> give feedback</h1>
      <Button onClick={()=>setGood(good+1)} text="good"/>
      <Button onClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={()=>setBad(bad+1)} text="bad"/>
      <br/>
      <br/>
      <br/>
      <h1>Statistics</h1>
      <Statistics name="good" value={good}/>
      <Statistics name="neutral" value={neutral}/>
      <Statistics name="bad" value={bad}/>
      <Statistics name="average" value={average}/>
      <Statistics name="positive" value={positive}/>
    </div>
  )
}

export default App