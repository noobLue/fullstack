import { useState } from 'react'

const Button = ({text, value, onClick}) => {

  return (
    <button onClick={()=>{
      onClick(value + 1)
    }}>{text}</button>
  )
}

const Feedback = ({buttons}) => {
  return (<div>
    <h1>give feedback</h1>
    <Button onClick={buttons[0].onClick} text={buttons[0].text} value={buttons[0].value}/>
    <Button onClick={buttons[1].onClick} text={buttons[1].text} value={buttons[1].value}/>
    <Button onClick={buttons[2].onClick} text={buttons[2].text} value={buttons[2].value}/>
  </div>)
}



const StatisticLine = ({key_, value}) => <tr><td>{key_}</td><td>{value}</td></tr>

const Statistics = ({buttons}) => {
  const good = buttons[0].value;
  const neutral = buttons[1].value;
  const bad = buttons[2].value;

  if(good === 0 && neutral === 0 && bad === 0)
    return (<p>
      No feedback given
    </p>)

  const total = good+neutral+bad;
  const average = (total === 0) ? 0 : (good - bad) / total;
  const percentage = (total === 0) ? 0 : (good / total) * 100;

  const percText = percentage + " %";

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine key_='good' value={good}/> 
          <StatisticLine key_='neutral' value={neutral}/> 
          <StatisticLine key_='bad' value={bad}/> 
          <StatisticLine key_='all' value={total}/> 
          <StatisticLine key_='average' value={average}/> 
          <StatisticLine key_='positive' value={percText}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const arr = [
    {text:"good", value: good, onClick: setGood},
    {text:"neutral", value: neutral, onClick: setNeutral},
    {text:"bad", value: bad, onClick: setBad},
  ];

  return (
    <div>
      <Feedback buttons={arr}/>
      <Statistics buttons={arr}/>
    </div>
  )
}

export default App