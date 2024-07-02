import React from 'react';
import ReactDOM from 'react-dom';
import '../common/fps';
import PDom from '../../library/react';

const Busy = PDom(() => import('./busy'));

export const App = () => {
    const [number, setNumber] = React.useState(0);
    return <div>
        <div>hello</div>
        <Busy number={number} onSelect={(n) => setNumber(n)}>
        </Busy>
    </div>
};


const root = document.getElementById('root');
ReactDOM.render(<App />, root);
