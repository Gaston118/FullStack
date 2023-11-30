import React from 'react'
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  if (maxVotes === 0) {
    return null; 
  }

  return (
    <div>
      <h2>Most Voted Anecdote</h2>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>Votes: {maxVotes}</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <div>
        <h2>Current Anecdote</h2>
        <p>{props.anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>
      </div>

      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next Anecdote</button>
      <MostVotedAnecdote anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = createRoot(document.getElementById('root'));
root.render(<App anecdotes={anecdotes} />);