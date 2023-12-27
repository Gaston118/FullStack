import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteA(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      )
      return updatedAnecdotes
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const {voteA, appendAnecdotes, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id);
    dispatch(voteA(id));
  };
};

export default anecdoteSlice.reducer