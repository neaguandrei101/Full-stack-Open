import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>
    {text}
  </button>

const Statistics = ({ good, neutral, bad, all, average, positive, setGood, setNeutral, setBad }) => {
  if (all === 0)
    return (
      <div>
        <h1>give feedback</h1>
        <Statistic field={good} setter={setGood} text='good' />
        <Statistic field={neutral} setter={setNeutral} text='neutral' />
        <Statistic field={bad} setter={setBad} text='bad' />
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  return (
    <div>
      <h1>give feedback</h1>
      <Statistic field={good} setter={setGood} text='good' />
      <Statistic field={neutral} setter={setNeutral} text='neutral' />
      <Statistic field={bad} setter={setBad} text='bad' />
      <h1>statistics</h1>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const Statistic = ({ field, setter, text }) =>
  <Fragment>
    <Button handleClick={() => { setter(field + 1) }} text={text} />
    <p>{text} {field}</p>
  </Fragment>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good + bad * -1) / all
  const positive = good * 100 / all

  return (
    <div>
      <Statistics good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
        setGood={setGood}
        setBad={setBad}
        setNeutral={setNeutral}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)