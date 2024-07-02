import React from 'react';

const Busy = ({ number, onSelect }) => {
    return <div>
        <div>Busy</div>
        <div>{number}</div>
        <button onClick={() => onSelect(number + 1)}>Increment</button>
    </div>
}

export default Busy;