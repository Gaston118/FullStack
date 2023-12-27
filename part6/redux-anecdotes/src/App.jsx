import React from 'react'
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdote => dispatch(setAnecdotes(anecdote)))
  }, [dispatch])

  return (
    <div>
     <AnecdoteList></AnecdoteList>
     <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App