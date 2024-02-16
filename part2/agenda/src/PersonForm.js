import React from "react";
import './PersonForm.css';

const PersonForm = ({ addName, newName, handleName, newNumber, handleNumber }) => {
    return (
        <form className="form" onSubmit={addName}>
        <div>Name: <input value={newName} onChange={handleName} required/></div>
        <div>Number: <input value={newNumber} onChange={handleNumber} required/></div>
        <div>
        <span className="text-add">Add</span>
          <button type="submit" className="button-add">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4V20" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 12H20" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </button>
        </div>
      </form>
    )
}

export default PersonForm;