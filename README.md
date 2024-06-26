
<p align="center">
<img width="84" height="84" src="https://cdn.jsdelivr.net/gh/pdomdev/pdom/assets/pdom.svg" />
</p>
<br/>

# Parallel DOM  [![npm version](https://badge.fury.io/js/parallel-dom.svg)](https://badge.fury.io/js/parallel-dom)

Make your apps faster, parallelize away heavy DOM operations.

<br/>

## Usage

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

```jsx
import PDom from 'parallel-dom/react';

export const MyComponent = () => {
    return <>
        ...
        <PDom 
            className="my-class" 
            script={() => import(
                'path/to/script/which/runs/in/parallel'
            )}>
            <Child></Child> {/* Optional children */}
        </PDom>
    </>
}
```

## Under the hood

1. Creates an iframe on a `https://<hash>.pdom.dev` domain.
2. Passes the scriptUrl and creates a clone of the passed DOM element to the above frame.
3. The iframe loads and runs the script.
4. Since, iframe is cross origin, the browser creates a dedicated process for it.
5. We use `origin-agent-cluster` header to enable multiple `PDom` to have their own dedicated subframe process.

For more details:

- [Performance isolation with the Origin-Agent-Cluster header](https://web.dev/articles/origin-agent-cluster)

