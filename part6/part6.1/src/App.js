import Notes from "./components/Note"
import NewNote from "./components/NewNote"
import React from 'react'
import VisibilityFilter from "./components/VisibilityFilter"

const App = () => {

  return(
    <div>
      <NewNote />

      <VisibilityFilter/>

      <Notes />
    </div>
  )
}

export default App