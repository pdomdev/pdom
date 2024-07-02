import React from 'react';
import PDomClass from '.';

class PDomReact extends PDomClass {
    public setProps(props) {
        this.sendMessage({
            _type: 'pdom-props',
            props,
        });
    }
}

const PDom = (importFn: () => Promise<any>) => {
    const Component = React.lazy(importFn);
    return React.forwardRef((props, ref) => {
        const containerRef = React.useRef(null);

        React.useEffect(() => {
            const pDom = new PDomReact(containerRef.current, {
                script: importFn
            });
            pDom.render().then(() => {
                ref.current = pDom;
            });
            pDom.onMessage((message) => {
                if (message._type === 'pdom-callback') {
                    const { callbackId, args } = message;
                    return props[callbackId](...args);
                }
            });
        }, []);

        React.useEffect(() => {
            const newProps = {};
            for (const key in props) {
                const value = props[key];
                if (typeof value === 'function') {
                    newProps[key] = '__function__';
                } else {
                    newProps[key] = value;
                }
            }
            ref.current?.setProps?.(props);
        }, [props]);

        return <div ref={containerRef} className="pdom"></div>
    });
}

export default PDom;