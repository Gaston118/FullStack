import './Person.css'

const Person = ({ person, handleDelete}) => {
    return (
      <div className='lista-cont'>
      <li className='lista'>{person.name} {person.number}
      <button className='button-delete' onClick={() => handleDelete(person.id)}>Delete</button>
      </li>
      </div>
    )
  }
  
  export default Person