import { getAnecdotes, createAnecdote, updateAnecdote } from './request'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const notifyWith = useNotify()
  const queryClient = useQueryClient() //LO QUE HACE ESTO ES QUE RECUPERA LAS NOTAS DEL SEV DESPUES DE 
  //HABERLA AGREGADO.
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notifyWith(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
