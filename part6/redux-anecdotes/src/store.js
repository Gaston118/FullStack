import { configureStore } from '@reduxjs/toolkit'

import notificacionReducer from './reducers/notificacionReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notificacion: notificacionReducer
  }
})

export default store