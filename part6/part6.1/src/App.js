import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Note'
import VisibilityFilter from './components/VisibilityFilter'

import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => { 

  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch]) // eslint-disable-next-line

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App