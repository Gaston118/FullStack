import React from "react";

const PersonForm = ({ addName, newName, handleName, newNumber, handleNumber }) => {
    return (
        <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleName} required/></div>
        <div>number: <input value={newNumber} onChange={handleNumber} required/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

export default PersonForm;