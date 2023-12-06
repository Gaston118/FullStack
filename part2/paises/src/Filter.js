import React from 'react'

const Filter = ({ searchTerm, onSearchChange }) => {
    return (
        <div>
        Find countries: <input value={searchTerm} onChange={onSearchChange} />
      </div>
    )
}

export default Filter;
