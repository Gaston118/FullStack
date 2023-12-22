import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useState } from 'react'

function AnecdoteForm() {
    const dispatch = useDispatch()
    const [newAnecdote, setNewAnecdote] = useState('')

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(newAnecdote))
        setNewAnecdote('')
      }

  return (
    <div> 
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>
        <input
          type="text"
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm