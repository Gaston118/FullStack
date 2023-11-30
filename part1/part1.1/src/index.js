import React from 'react'
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
    )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({parts}) => {
  return (
    <div>
    <Part part={parts[0].name} exercises={parts[0].exercises} />
    <Part part={parts[1].name} exercises={parts[1].exercises} />
    <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = ({parts}) => {
  let totalExercises = 0;

  parts.forEach((part) => {
    totalExercises += part.exercises;
  });

  return (
    <div>
    <p>Number of exercises {totalExercises}</p>
    </div>
    )
  }

  const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const handleClick = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Display counter={left}/>
    <Button handleClick={handleLeftClick} text='left'/>
    <Button handleClick={handleRightClick} text='right'/>
    <Display counter={right}/>
    <History allClicks={allClicks} />

    <Display counter={counter}/>
    <Button handleClick={handleClick} text='plus'/>
    <Button handleClick={setToZero} text='zero'/>     
    <Button handleClick={decreaseByOne} text='minus'/>   

    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);