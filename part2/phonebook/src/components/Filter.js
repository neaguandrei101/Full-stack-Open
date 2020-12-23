import React from 'react'

const Filter = ({filter, handleFilterChange, handleFilterButtonClick}) => {
    return (
        <div>
            filter shown with: <input value={filter} onChange={handleFilterChange} />
            <button onClick={handleFilterButtonClick}>filter enabled</button>
        </div>
    )

}

export default Filter