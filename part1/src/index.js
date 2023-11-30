import React from 'react'
import { createRoot } from 'react-dom/client';

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

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    <Total parts={parts} />
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);