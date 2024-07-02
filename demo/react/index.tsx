import React from 'react';
import ReactDOM from 'react-dom';
import '../common/fps';
import PDom from '../../library/react';

const Busy = PDom(() => import('./busy'));

export const App = () => {
    const [number, setNumber] = React.useState(0);
    const ref = React.useRef(null);
    return <div>
        <div>hello</div>
        <Busy ref={ref} number={number} onSelect={(n) => setNumber(n)}>
        </Busy>
    </div>
};


const root = document.getElementById('root');
ReactDOM.render(<App />, root);
