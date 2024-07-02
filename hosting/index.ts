import { onMessage, sendMessage } from 'promise-postmessage';
import { inject } from "@vercel/analytics"
inject();


const defaultRunner = async (scriptUrls) => {
    for (const scriptUrl of scriptUrls) {
        await import(scriptUrl);
    }
}

const FrameworkRunners = {
    'react': async ([react, reactDOM, app]) => {
        const { default: React } = await import(react);
        const { default: ReactDOM } = await import(reactDOM);
        const { default: App } = await import(app);
        const callbacks = {};
        function getProps(props) {
            const newProps = {};
            for (const key in props) {
                const value = props[key];
                if (value === '__function__') {
                    newProps[key] = callbacks[key] || ((...args) => {
                        return sendMessage(window.parent, {
                            _type: 'pdom-callback',
                            callbackId: key,
                            args,
                        }, { origin: hostOrigin });
                    });
                    callbacks[key] = newProps[key];
                } else {
                    newProps[key] = value;
                }
            }
            return newProps;
        }


        const root = ReactDOM.createRoot(document.body.firstElementChild as HTMLElement);
        onMessage((message) => {
            if (message._type === 'pdom-props') {
                root.render(React.createElement(App, getProps(message.props)));
            }
        }, window.parent, 'child')
    },
}

function createElement(nodeOuterHTML, cssText) {
    document.body.insertAdjacentHTML('afterbegin', nodeOuterHTML);
    const targetEl = document.body.firstElementChild as HTMLElement;
    targetEl.style.cssText = cssText;
}


window.addEventListener('error', (e) => {
    sendMessage(window.parent, {
        _type: 'pdom-error',
        error: {
            message: e.message,
            type: e.type,
        }
    });
});

const params = new URLSearchParams(window.location.search);
const host = params.get('host') as string;
const scheme = params.get('scheme');
const hostOrigin = `${scheme}://${host}`;

console.log('hostOrigin', hostOrigin);
const reponse = await sendMessage(window.parent, { _type: 'pdom-init' }, {
    origin: hostOrigin,
    needsResponse: true,
});
const { nodeOuterHTML, cssText, scriptUrls, framework } = reponse;
createElement(nodeOuterHTML, cssText);
const fqnScriptUrls = scriptUrls.map(scriptUrl => (scriptUrl.startsWith('http'))
    ? scriptUrl
    : new URL(scriptUrl, hostOrigin).href);

const runner = FrameworkRunners[framework] || defaultRunner;
await runner(fqnScriptUrls);

sendMessage(window.parent, { _type: 'pdom-loaded' }, {
    origin: hostOrigin,
});

