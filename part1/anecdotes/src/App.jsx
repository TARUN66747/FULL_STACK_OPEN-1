import { useState } from 'react'
const Button = (props) =>{
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const Largest =({anecdotes,vote,selected})=>{
  const maxVotes = Math.max(...vote)
  const maxIndex = vote.indexOf(maxVotes)

  if (maxVotes===0){
    
  return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes cast yet</p>
      </div>
    )
}
  else {

  return (
    <>
    <p>Anecdote with most votes</p>
    <div>{anecdotes[maxIndex]}</div>
    <div>has {vote[maxIndex]} votes</div>
    </>
  
  )
}
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote,voteChanger]= useState(new Array(anecdotes.length).fill(0))


  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  const VoteHandler = () =>{
    let copy =[...vote]
    copy[selected] = copy[selected]+1
    console.log(copy)
    voteChanger(copy)
    
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <div><Button onClick={handleNextAnecdote} text="next anectode"/>
      <Button onClick={VoteHandler} text="vote"/>
      <Largest anecdotes={anecdotes} vote={vote} selected={selected}/>
      </div>
    </div>
  )
}

export default App