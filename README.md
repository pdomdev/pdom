
<p align="center">
<img width="84" height="84" src="https://cdn.jsdelivr.net/gh/pdomdev/pdom/assets/pdom.svg" />
</p>
<br/>

# Parallel DOM  [![npm version](https://badge.fury.io/js/parallel-dom.svg)](https://badge.fury.io/js/parallel-dom)

Make your apps faster, parallelize away heavy DOM operations.

<br/>

## Usage

### Javascript

[Example](https://github.com/pdomdev/pdom/demo/parallel) | [Demo](https://demo.pdom.dev/parallel/)

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


[Example](https://github.com/pdomdev/pdom/demo/react) | [Demo](https://demo.pdom.dev/react/)

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

#### React limitations

1. Not supported: unserializable props (JSX in props etc.)
2. Callbacks in Props are supported, but they are all async.


## Under the hood

1. Creates an iframe on a `https://<hash>.pdom.dev` domain.
2. Passes the scriptUrl and creates a clone of the passed DOM element to the above frame.
3. The iframe loads and runs the script.
4. Since, iframe is cross origin, the browser creates a dedicated process for it.
5. We use `origin-agent-cluster` header to enable multiple `PDom` to have their own dedicated subframe process.

For more details:

- [Performance isolation with the Origin-Agent-Cluster header](https://web.dev/articles/origin-agent-cluster)

