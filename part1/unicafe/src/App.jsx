import { useState } from 'react'
const Button = (props)=>{
   return <button onClick={props.onClick} >{props.text}</button>
}
const Statistics= (props) => {
  if(props.good + props.neutral + props.bad ===0){
    return(
      <p> No feedback is given</p>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
      <tbody>
      <StatisticLine name="good" value={props.good} />
      <StatisticLine  name="neutral" value={props.neutral} />
      <StatisticLine  name="bad" value={props.bad} />
      <StatisticLine name="all"  value={props.total}/>
      <StatisticLine  name="average" value={props.average} />
      <StatisticLine name="positive" value={props.positive} />
      </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  
  return (
    
      <tr>
        <th>{props.name}</th>
        <td>{props.value}</td>
      </tr>
   
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
      
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      total={total}
      average={average}
      positive={positive}/>
    </div>
  )
}

export default App