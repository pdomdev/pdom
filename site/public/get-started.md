## Install

```
$ npm i parallel-dom
```

### Javascript

[Example](https://github.com/pdomdev/pdom/tree/main/demo/parallel) | [Demo](https://demo.pdom.dev/parallel/)

```js
import PDom from 'parallel-dom';

const pdom = new PDom(
    // The root, the subtree will be 
    // made parallel.
    '#root', 

    // Javascript entry point of the script 
    // to run parallely inside the parallel subtree.
    () => import('path/to/script/which/runs/in/parallel') 
);
pdom.render();
```

### React


[Example](https://github.com/pdomdev/pdom/tree/main/demo/react) | [Demo](https://demo.pdom.dev/react/)

```jsx
// parallel-component.tsx
const ParallelComponent = ({ prop1, onCallback }) => {
    // heavy operations.
    // ...
    return <button onClick={onCallback}>{prop1}</button>
}
```

```jsx
import PDom from 'parallel-dom/react';

const ParallelComponent = PDom(() => import('./parallel-component'));

export const App = () => {
    const [p1, setP1] = useState('');
    return <>
        ...
        <ParallelComponent prop1={p1} onCallback={cb} />
    </>
}
```
