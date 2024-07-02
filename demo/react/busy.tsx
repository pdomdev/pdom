import React from 'react';

interface BusyProps {
    number: number;
    onSelect: (number: number) => void;
}

const Busy: React.FC<BusyProps> = ({ number, onSelect }) => {
    return <div>
        <div>Busy</div>
        <div>{number}</div>
        <button onClick={() => onSelect(number + 1)}>Increment</button>
    </div>
}

export default Busy;