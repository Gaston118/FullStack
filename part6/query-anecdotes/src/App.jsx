import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './components/request'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: 1
    }
  )
  console.log(result)

  if(result.isError){
    return <div>Error: {result.error.message}</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
