import { useState } from 'react'

const Anecdote = ({anecdotes, selected, votes}) => {
  return (<div>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected] || 0} votes</p>
  </div>)
}

const Button = ({onClick, text}) => {

  return (<button onClick={onClick}>
    {text}
  </button>)
}

const AnecdoteOfTheDay = ({anecdotes, selected, votes, setSelected, setVotes}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button onClick={()=>{
        const v = {...votes};
        v[selected] = votes[selected] + 1 || 1;
        setVotes(v);
        }} text="vote"/>
      <Button onClick={()=>{setSelected(Math.floor(Math.random() * anecdotes.length))}} text="next anecdote"/>
    </div>
  )
}

const AnecdotePopular = ({votes, anecdotes}) => {
  let best = -1;
  let vs = 0;
  
  // choose best anecdote
  Object.entries(votes).forEach(([key, value]) => {
    console.log("line",key, value)
    if(value > vs)
    {
      best = key;
      vs = value;
    }
  });

  // don't render anything if nobody has voted yet
  if(best === -1)
  {
    return (<div></div>)
  }
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={best} votes={votes}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} selected={selected} votes={votes} setSelected={setSelected} setVotes={setVotes}/>
      <AnecdotePopular anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App